<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { ref } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { useEventsStore } from '~/stores/events';

async function fetchData() {
    // Fetch data from the server
    try {
        // Make the API call
        await useEventsStore().fetchChaptersEvents(useRouter().currentRoute.value.params.chapterid);
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

const columns = ref([
    { field: 'name', header: 'Name' },
    { field: 'event_date', header: 'Event Date' },
    { field: 'event_type.name', header: 'Event Type' }
]);
const filters = ref({
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    event_date: { value: null, matchMode: FilterMatchMode.CONTAINS },
    'event_type.name': { value: null, matchMode: FilterMatchMode.CONTAINS }
});

const toast = useToast();

async function onCellEditComplete(event) {
    try {
        await useEventsStore().saveChapterEvent(event.newData.id, event.newData.chapter_id, event.newData.assignee_name, event.newData.section_id, event.newData.note, event.newData.due_date, event.newData.completed_date);
        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Event updated successfully',
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
    useEventsStore().fetchChaptersEvents(newRoute.params.chapterid);
});
</script>

<template>
    <Toast></Toast>

    <h2>Events</h2>

    <AddChapterEvent :chapter-id="useRouter().currentRoute.value.params.chapterid" @updatesubmit="chapterUpdates()"></AddChapterEvent>

    <div class="card p-fluid">
        <DataTable
            v-model:filters="filters"
            :value="useEventsStore().chapterEvents"
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
