<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useChaptersStore } from '~/stores/chapters';
import { useUpdatesStore } from '~/stores/updates';

async function fetchData() {
    // Fetch data from the server
    try {
        // Make the API call
        await useUpdatesStore().fetchZoneUpdate(useRouter().currentRoute.value.params.zone);
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

const columns = ref([
    { field: 'update_date', header: 'Date' },
    { field: 'user_name', header: 'Name' },
    { field: 'chapter_name', header: 'Chapter' },
    { field: 'update_text', header: 'Update' }
]);
const filters = ref({
    update_date: { value: null, matchMode: FilterMatchMode.CONTAINS },
    user_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    chapter_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    update_text: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

const onCellEditComplete = (event) => {
    useUpdatesStore().saveChapterUpdate(event.newData.id, event.newData.chapter_id, event.newData.update_date, event.newData.update_text);

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

async function fetchChapterDetails(chapter_id: string) {
    await useChaptersStore().fetchChapter(chapter_id);
}

onBeforeRouteUpdate((newRoute) => {
    fetchChapterDetails(newRoute.params.chapterid);
    useUpdatesStore().fetchZoneUpdate(newRoute.params.zone);
});
</script>

<template>
    <h1>Updates</h1>

    <div class="card p-fluid">
        <DataTable
            v-model:filters="filters"
            :value="useUpdatesStore().chaptersUpdates"
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
