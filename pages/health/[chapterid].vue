<script setup lang="ts">
import { reloadNuxtApp } from '#app';

definePageMeta({
    layout: 'health'
});
import { onBeforeMount } from 'vue';
import { useChaptersStore } from '~/stores/chapters';

const chapters_store = useChaptersStore();

async function fetchChapterDetails(chapter_id: string) {
    await chapters_store.fetchChapter(chapter_id);
}

async function fetchData() {
    try {
        // Make the API call
        const route = useRoute();
        const chapter_id = route.params.chapterid;
        await fetchChapterDetails(chapter_id);
    } catch (error) {
        // Handle any errors here
        console.error('fetchChapters');
        console.error(error);
    }
}

onMounted(() => {
    // Call fetchData when the component is about to be mounted
    reloadNuxtApp();
    fetchData();
});

onBeforeRouteUpdate((newRoute) => {
    fetchChapterDetails(newRoute.params.chapterid);
});
</script>

<template>
    <h1 v-if="chapters_store.chapter && chapters_store.chapter.name">{{ chapters_store.chapter.name }} Health Portal</h1>
    <HealthTable></HealthTable>
</template>
