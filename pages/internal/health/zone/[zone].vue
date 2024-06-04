<script setup lang="ts">
import { reloadNuxtApp } from '#app';
import { TabMenuChangeEvent } from 'primevue/tabmenu';

definePageMeta({
    layout: 'health'
});

onMounted(() => {
    // Call fetchData when the component is about to be mounted
});

const nestedRouteItems = ref([
    {
        label: 'Health'
    },
    {
        label: 'Updates'
    }
]);

const currentTab = ref(0);

const updateTab = (tab: TabMenuChangeEvent) => {
    currentTab.value = tab.index;
};
</script>

<template>
    <h1>{{ useRoute().params.zone }}</h1>

    <div class="mb-5">
        <TabMenu :model="nestedRouteItems" @tabChange="(event: TabMenuChangeEvent) => updateTab(event)" />
    </div>
    <div v-if="currentTab === 0">
        <ZonalHealth></ZonalHealth>
    </div>
    <div v-else-if="currentTab === 1">
        <ZonalUpdate></ZonalUpdate>
    </div>
</template>

<style scoped lang="scss"></style>
