<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useUpdatesStore } from '~/stores/updates';
import { useSectionsStore } from '~/stores/sections';

async function fetchSectionData(section_id: string) {
    try {
        // Make the API call
        await useSectionsStore().fetchSection(section_id);
    } catch (error) {
        // Handle any errors here
        console.error('fetchSection');
        console.error(error);
    }
}

async function fetchData() {
    // Fetch data from the server
    try {
        // Make the API call
        await useUpdatesStore().fetchSectionsUpdate(useRouter().currentRoute.value.params.sectionid);
    } catch (error) {
        // Handle the error
        console.error(error);
    }
}

onBeforeMount(() => {
    // Call fetchData when the component is about to be mounted
    fetchData();
});

onBeforeRouteUpdate((newRoute) => {
    fetchSectionData(newRoute.params.sectionid);
    useUpdatesStore().fetchSectionsUpdate(newRoute.params.sectionid);
});

import { ref } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { useChaptersStore } from '~/stores/chapters';

const columns = ref([
    { field: 'update_date', header: 'Date' },
    { field: 'update_text', header: 'Update' }
]);
const filters = ref({
    update_date: { value: null, matchMode: FilterMatchMode.CONTAINS },
    update_text: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

const onCellEditComplete = (event) => {
    useUpdatesStore().saveSectionUpdate(event.data.id, event.data.section_id, event.data.update_date, event.data.update_text);

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
</script>

<template>
    <div v-if="useSectionsStore().section && useSectionsStore().section.name">
        <h1>{{ useSectionsStore().section.name }} Team Updates</h1>
    </div>

    <div class="card p-fluid">
        <DataTable
            v-model:filters="filters"
            :value="useUpdatesStore().sectionsUpdates"
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
