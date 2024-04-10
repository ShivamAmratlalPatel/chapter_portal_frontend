<script setup lang="ts">
import { useSectionsStore } from '~/stores/sections';
import { onBeforeMount, ref } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router';

const sections_store = useSectionsStore();

async function fetchData() {
    try {
        // Make the API call
        await sections_store.fetchSections();
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
    fetchData();
});

const selectButtonValue1 = ref(null);
</script>

<template>
    <SelectButton v-model="selectButtonValue1" :options="sections_store.sections" optionLabel="name" />
    <div v-for="section in sections_store.sections" :key="section.id">
        <HealthTableElement v-if="selectButtonValue1 && selectButtonValue1.id === section.id" :section_id="section.id"></HealthTableElement>
    </div>
</template>
