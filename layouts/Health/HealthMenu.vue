<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import AppMenuItem from '../AppMenuItem.vue';
import { useChaptersStore } from '~/stores/chapters';

const chapters_store = useChaptersStore();

async function fetchData() {
    try {
        // Make the API call
        await chapters_store.fetchAllChapters();
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
    <ul class="layout-menu">
        <template v-for="(item, i) in chapters_store.chapter_sidebar_list" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
