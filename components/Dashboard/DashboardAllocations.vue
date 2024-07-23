<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useChaptersStore } from '~/stores/chapters';
import { ref } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { useAllocationsStore } from '~/stores/allocations';
import { useActionsStore } from '~/stores/actions';

async function fetchData() {
    // Fetch data from the server
    try {
        // Make the API call
        await useAllocationsStore().fetchChaptersAllocations(useRouter().currentRoute.value.params.chapterid);
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
    { field: 'user_name', header: 'Name' },
    { field: 'section_name', header: 'Team' }
]);
const filters = ref({
    user_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    section_name: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

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
    useAllocationsStore().fetchChaptersAllocations(newRoute.params.chapterid);
});
</script>

<template>
    <h2>Allocations</h2>

    <div class="card p-fluid">
        <DataTable
            v-model:filters="filters"
            :value="useAllocationsStore().chapterAllocations"
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
            <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"></Column>
        </DataTable>
    </div>
</template>
