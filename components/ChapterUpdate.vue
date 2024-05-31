<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useChaptersStore } from '~/stores/chapters';
import { useUpdatesStore } from '~/stores/updates';

async function fetchData() {
    // Fetch data from the server
    try {
        // Make the API call
        await useUpdatesStore().fetchChaptersUpdates(useRouter().currentRoute.value.params.chapterid);
    } catch (error) {
        // Handle the error
        console.error(error);
    }
}

async function chapterUpdates() {
    console.log('chapterUpdated');
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
    { field: 'update_text', header: 'Update' }
]);
const filters = ref({
    update_date: { value: null, matchMode: FilterMatchMode.CONTAINS },
    update_text: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

const onCellEditComplete = (event) => {
    useUpdatesStore().saveChapterUpdate(event.data.id, event.data.chapter_id, event.data.update_date, event.data.update_text);

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
    useUpdatesStore().fetchChaptersUpdates(newRoute.params.sectionid);
});
</script>

<template>
    <h1 v-if="useChaptersStore().chapter && useChaptersStore().chapter.name">{{ useChaptersStore().chapter.name }} Updates</h1>

    <AddChapterUpdate :chapter-id="useRouter().currentRoute.value.params.chapterid" @updatesubmit="chapterUpdates()"></AddChapterUpdate>

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
