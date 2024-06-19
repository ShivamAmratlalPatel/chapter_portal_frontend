<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useChaptersStore } from '~/stores/chapters';
import { useActionsStore } from '~/stores/actions';

async function fetchData() {
    // Fetch data from the server
    try {
        // Make the API call
        await useActionsStore().fetchChaptersActions(useRouter().currentRoute.value.params.chapterid);
    } catch (error) {
        // Handle the error
        console.error(error);
    }
}

async function chapterUpdates() {
    await fetchData();
}

onBeforeMount(() => {
    // Call fetchData when the component is about to be mounted
    fetchData();
});

import { ref } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { useCommitteesStore } from '~/stores/committees';

const columns = ref([
    { field: 'section_name', header: 'Section' },
    { field: 'assignee_name', header: 'Assignee' },
    { field: 'due_date', header: 'Due Date' },
    { field: 'note', header: 'Note' },
    { field: 'completed_date', header: 'Completed Date' }
]);
const filters = ref({
    section_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    assignee_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    due_date: { value: null, matchMode: FilterMatchMode.CONTAINS },
    note: { value: null, matchMode: FilterMatchMode.CONTAINS },
    completed_date: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

const toast = useToast();

async function onCellEditComplete(event) {
    try {
        await useActionsStore().saveChapterAction(event.newData.id, event.newData.chapter_id, event.newData.assignee_name, event.newData.section_id, event.newData.note, event.newData.due_date, event.newData.completed_date);
        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Action updated successfully',
            life: 3000
        });
    } catch (error) {
        await fetchData();
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: `Failed to update committee member: ${error}`,
            life: 3000
        });
    }

    let { data, newValue, field } = event;

    switch (field) {
        case 'quantity':
        case 'price':
            if (isPositiveInteger(newValue)) data[field] = newValue;
            else event.preventDefault();
            break;

        default:
            if (newValue.trim().length > 0) data[field] = newValue;
            else event.preventDefault();
            break;
    }
}

const isPositiveInteger = (val) => {
    let str = String(val);

    str = str.trim();

    if (!str) {
        return false;
    }

    str = str.replace(/^0+/, '') || '0';
    var n = Math.floor(Number(str));

    return n !== Infinity && String(n) === str && n >= 0;
};

onBeforeRouteUpdate((newRoute) => {
    useActionsStore().fetchChaptersActions(newRoute.params.chapterid);
});
</script>

<template>
    <Toast></Toast>

    <h2>Actions</h2>

    <AddChapterAction :chapter-id="useRouter().currentRoute.value.params.chapterid" @updatesubmit="chapterUpdates()"></AddChapterAction>

    <div class="card p-fluid">
        <DataTable
            v-model:filters="filters"
            :value="useActionsStore().chapterActions"
            editMode="cell"
            @cell-edit-complete="onCellEditComplete"
            filterDisplay="row"
            :pt="{
                table: { style: 'min-width: 50rem' },
                column: {
                    bodycell: ({ state }) => ({
                        class: [{ 'pt-0 pb-0': state['d_editing'] }]
                    })
                }
            }"
        >
            <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header" style="width: 25%" sortable filter>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" v-tooltip.top.focus="'Hit enter key to filter'" type="text" @keydown.enter="filterCallback()" class="p-column-filter" />
                </template>
                <template #editor="{ data, field }">
                    <InputText v-model="data[field]" autofocus />
                </template>
            </Column>
        </DataTable>
    </div>
</template>
