<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useChaptersStore } from '~/stores/chapters';
import { ref } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { useCommitteesStore } from '~/stores/committees';

async function fetchData() {
    // Fetch data from the server
    try {
        // Make the API call
        await useCommitteesStore().fetchChaptersCommittees(useRouter().currentRoute.value.params.chapterid);
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
    { field: 'commencement_date', header: 'Start Date' },
    { field: 'name', header: 'Name' },
    { field: 'position', header: 'Role' }
]);
const filters = ref({
    commencement_date: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    position: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

const onCellEditComplete = (event) => {
    useCommitteesStore().saveChapterCommittee(event.data.id, event.data.chapter_ids, event.data.update_date, null, event.data.update_text);

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
};

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
    useCommitteesStore().fetchChaptersCommittees(newRoute.params.chapterid);
});
</script>

<template>
    <h2>Committee</h2>

    <AddChapterCommittee :chapter-id="useRouter().currentRoute.value.params.chapterid" @updatesubmit="chapterUpdates()"></AddChapterCommittee>

    <div class="card p-fluid">
        <DataTable
            v-model:filters="filters"
            :value="useCommitteesStore().chapterCommittees"
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
