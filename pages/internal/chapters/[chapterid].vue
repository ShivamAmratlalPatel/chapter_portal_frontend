<script setup lang="ts">
import { reloadNuxtApp } from '#app';
import { TabMenuChangeEvent } from 'primevue/tabmenu';
import { useChaptersStore } from '~/stores/chapters';

definePageMeta({
    layout: 'health'
});

const nestedRouteItems = ref([
    {
        label: 'Dashboard'
    },
    {
        label: 'Events'
    },
    {
        label: 'Health'
    },
    {
        label: 'Updates'
    },
    {
        label: 'Visits'
    },
    {
        label: 'Committee'
    },
    {
        label: 'Allocations'
    }
]);

const currentTab = ref(0);

const updateTab = (tab: TabMenuChangeEvent) => {
    currentTab.value = tab.index;
};

const chapters_store = useChaptersStore();

async function fetchChapterDetails(chapter_id: string) {
    await chapters_store.fetchChapter(chapter_id);
}

async function fetchData() {
    try {
        // Make the API call
        const chapter_id = useRouter().currentRoute.value.params.chapterid;
        await fetchChapterDetails(chapter_id);
    } catch (error) {
        // Handle any errors here
        console.error('fetchChapters');
        console.error(error);
    }
}

onMounted(() => {
    reloadNuxtApp();
    // Call fetchData when the component is about to be mounted
    fetchData();
});

onBeforeRouteUpdate((newRoute) => {
    fetchChapterDetails(newRoute.params.chapterid);
});
</script>

<template>
    <h1 v-if="chapters_store.chapter && chapters_store.chapter.name">{{ chapters_store.chapter.name }}</h1>

    <div>
        <TabMenu :model="nestedRouteItems" @tabChange="(event: TabMenuChangeEvent) => updateTab(event)" />
    </div>
    <div v-if="currentTab === 0">
        <ChapterDashboard></ChapterDashboard>
    </div>
    <div v-if="currentTab === 1">
        <ChapterEvents></ChapterEvents>
    </div>
    <div v-if="currentTab === 2">
        <ChapterHealth></ChapterHealth>
    </div>
    <div v-else-if="currentTab === 3">
        <ChapterUpdate></ChapterUpdate>
    </div>
    <div v-else-if="currentTab === 4">
        <ChapterVisit></ChapterVisit>
    </div>
    <div v-else-if="currentTab === 5">
        <ChapterCommittee></ChapterCommittee>
    </div>
    <div v-else-if="currentTab === 6">
        <ChapterAllocations></ChapterAllocations>
    </div>
</template>

<style scoped lang="scss"></style>
