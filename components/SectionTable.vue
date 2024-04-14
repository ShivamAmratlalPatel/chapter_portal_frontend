<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useSectionsStore } from '~/stores/sections';
import { useChaptersStore } from '~/stores/chapters';

const chapters_store = useChaptersStore();
const sections_store = useSectionsStore();

const selectButtonValue1 = ref(null);
const buttons_list = ref([
    { year: '2024', month: '04', label: '2024-04' },
    { year: '2024', month: '05', label: '2024-05' },
    { year: '2024', month: '06', label: '2024-06' },
    { year: '2024', month: '07', label: '2024-07' },
    { year: '2024', month: '08', label: '2024-08' },
    { year: '2024', month: '09', label: '2024-09' },
    { year: '2024', month: '10', label: '2024-10' },
    { year: '2024', month: '11', label: '2024-11' },
    { year: '2024', month: '12', label: '2024-12' },
    { year: '2025', month: '01', label: '2025-01' },
    { year: '2025', month: '02', label: '2025-02' },
    { year: '2025', month: '03', label: '2025-03' }
]);

const selectButtonValue2 = ref([]);

async function fetchData() {
    try {
        // Make the API call
        const route = useRoute();
        await sections_store.fetchSection(route.params.sectionid);
    } catch (error) {
        // Handle any errors here
        console.error('fetchSection');
        console.error(error);
    }
    try {
        // Make the API call
        await chapters_store.fetchZones();
    } catch (error) {
        // Handle any errors here
        console.error('fetchSections');
        console.error(error);
    }
}

onBeforeMount(() => {
    // Call fetchData when the component is about to be mounted
    fetchData();
});
</script>

<template>
    <div v-if="sections_store.section && sections_store.section.name">
        <h1>{{ sections_store.section.name }} Team Health Doc</h1>
    </div>
    <Dropdown v-model="selectButtonValue1" :options="buttons_list" optionLabel="label" />

    <MultiSelect v-model="selectButtonValue2" :options="chapters_store.zones" optionLabel="name" />

    <div v-if="selectButtonValue1">
        <div v-for="zone in selectButtonValue2" :key="zone.id">
            <ZonalSectionTableElement :sectionid="sections_store.section.id" :zone="zone.name" :year="selectButtonValue1.year" :month="selectButtonValue1.month" />
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
