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
        label: 'Dashboard'
    },
    {
        label: 'Health'
    },
    {
        label: 'Updates'
    },
    {
        label: 'Matrix Meetings'
    },
    {
        label: 'Team Meetings'
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
        <h2>Dashboard</h2>
    </div>
    <div v-if="currentTab === 1">
        <ZonalHealth></ZonalHealth>
    </div>
    <div v-else-if="currentTab === 2">
        <ZonalUpdate></ZonalUpdate>
    </div>
    <div v-else-if="currentTab === 3">
        <MatrixMeetings></MatrixMeetings>
    </div>
    <div v-else-if="currentTab === 4">
        <ZonalTeamMeetings></ZonalTeamMeetings>
    </div>
</template>

<style scoped lang="scss"></style>
