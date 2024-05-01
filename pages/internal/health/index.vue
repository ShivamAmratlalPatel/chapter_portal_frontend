<script lang="ts" setup>
import { useAuthStore } from '~/stores/auth';

definePageMeta({
    layout: 'health'
});

import { onBeforeMount } from 'vue';
import { useChaptersStore } from '~/stores/chapters';

const chapters_store = useChaptersStore();

const columns = ref([
    {
        field: 'name',
        header: 'name'
    },
    {
        field: 'zone',
        header: 'zone'
    }
]);

const filter_search = ref('');

async function nextChapters() {
    try {
        await chapters_store.fetchChapters(chapters_store.chapters.next, filter_search.value);
    } catch (error) {
        console.error('nextChapters');
        console.error(error);
    }
}

async function openChapter(chapter_id) {
    const router = useRouter();
    router.push(`/internal/health/${chapter_id}`);
}

async function previousChapters() {
    try {
        await chapters_store.fetchChapters(chapters_store.chapters.previous, filter_search.value);
    } catch (error) {
        console.error('previousChapters');
        console.error(error);
    }
}

async function filterTicket() {
    try {
        await chapters_store.fetchChapters(null, filter_search.value);
    } catch (error) {
        console.error('filterTicket');
        console.error(error);
    }
}

async function fetchData() {
    try {
        // Make the API call
        await chapters_store.fetchChapters();
    } catch (error) {
        // Handle any errors here
        console.error('fetchChapters');
        console.error(error);
    }
}

onBeforeMount(() => {
    // Call fetchData when the component is about to be mounted
    fetchData();
});
</script>

<template>
    <h1>Chapters</h1>
    <div v-if="chapters_store.chapters">
        <span>Search: </span> <span><InputText v-model="filter_search" type="text" @update:model-value="filterTicket" /> </span>

        <DataTable :value="chapters_store.chapters.results" striped-rows @row-click="(event) => openChapter(event.data.id)">
            <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header" />
        </DataTable>
        <div class="relative">
            <Button v-if="chapters_store.chapters.previous" label="Previous Page" class="absolute left-0" color="primary" @click="previousChapters" />
            <Button v-if="chapters_store.chapters.next" label="Next Page" class="absolute right-0" color="primary" @click="nextChapters" />
        </div>
    </div>
</template>
