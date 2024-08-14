<script setup lang="ts">
import { useChaptersStore } from '~/stores/chapters';
import { reloadNuxtApp } from '#app';
import { useSectionsStore } from '~/stores/sections';

definePageMeta({
    layout: 'health'
});

const zone = ref();

const selectButtonValue1 = ref({ year: '2024', month: '04', week: '01', label: '2024-04 Week 1' });
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

const chapters_store = useChaptersStore();
const sections_store = useSectionsStore();

async function fetchData() {
    const route = useRoute();
    zone.value = route.params.zone;

    try {
        await sections_store.fetchSections();
    } catch (error) {
        console.error('fetchSection');
        console.error(error);
    }

    try {
        await chapters_store.fetchChapterByZone(zone.value);
    } catch (error) {
        console.error('fetchChapterByZone');
        console.error(error);
    }
}

onBeforeMount(() => {
    reloadNuxtApp();
    fetchData();
});
</script>

<template>
    <FloatLabel class="w-full md:w-14rem mb-2">
        <Dropdown v-model="selectButtonValue1" :options="buttons_list" optionLabel="label" inputId="dd-city"
                  class="w-full" />
        <label for="dd-city">Select a Year-Month and week</label>
    </FloatLabel>
    <div class="grid p-fluid" v-if="chapters_store.chapter_list">
        <div class="col-8 xl:col-4" v-for="chapter in chapters_store.chapter_list" :key="chapter.id">
            <div class="card flex flex-column align-items-center">
                <h5 class="text-left w-full">{{ chapter.name }}</h5>
                <ChapterRadarChart :chapter_id="chapter.id" :year="selectButtonValue1.year"
                                   :month="selectButtonValue1.month" :week="selectButtonValue1.week" />
            </div>
        </div>
    </div>
</template>
