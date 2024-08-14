<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useSectionsStore } from '~/stores/sections';
import { useChaptersStore } from '~/stores/chapters';

const chapters_store = useChaptersStore();
const sections_store = useSectionsStore();

const selectButtonValue1 = ref(null);
const buttons_list = ref([
    { year: '2024', month: '06', week: '01', label: '2024-06 Week 1' },
    { year: '2024', month: '07', week: '01', label: '2024-07 Week 1' },
    { year: '2024', month: '08', week: '01', label: '2024-08 Week 1' },
    { year: '2024', month: '08', week: '03', label: '2024-08 Week 3' },
    { year: '2024', month: '09', week: '01', label: '2024-09 Week 1' },
    { year: '2024', month: '09', week: '03', label: '2024-09 Week 3' },
    { year: '2024', month: '10', week: '01', label: '2024-10 Week 1' },
    { year: '2024', month: '10', week: '03', label: '2024-10 Week 3' },
    { year: '2024', month: '11', week: '01', label: '2024-11 Week 1' },
    { year: '2024', month: '11', week: '03', label: '2024-11 Week 3' },
    { year: '2024', month: '12', week: '01', label: '2024-12 Week 1' },
    { year: '2024', month: '12', week: '03', label: '2024-12 Week 3' },
    { year: '2025', month: '01', week: '01', label: '2025-01 Week 1' },
    { year: '2025', month: '01', week: '03', label: '2025-01 Week 3' },
    { year: '2025', month: '02', week: '01', label: '2025-02 Week 1' },
    { year: '2025', month: '02', week: '03', label: '2025-02 Week 3' },
    { year: '2025', month: '03', week: '01', label: '2025-03 Week 1' },
    { year: '2025', month: '03', week: '03', label: '2025-03 Week 3' }
]);

const selectButtonValue2 = ref([]);

async function fetchSectionData(section_id: string) {
    try {
        // Make the API call
        await sections_store.fetchSection(section_id);
    } catch (error) {
        // Handle any errors here
        console.error('fetchSection');
        console.error(error);
    }
}

async function fetchData() {
    try {
        // Make the API call
        await fetchSectionData(useRouter().currentRoute.value.params.sectionid);
    } catch (error) {
        // Handle any errors here
        console.error('fetchSectionData');
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

onBeforeRouteUpdate((newRoute) => {
    fetchSectionData(newRoute.params.sectionid);
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
            <ZonalSectionTableElement :sectionid="sections_store.section.id" :zone="zone.name"
                                      :year="selectButtonValue1.year" :month="selectButtonValue1.month"
                                      :week="selectButtonValue1.week" />
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
