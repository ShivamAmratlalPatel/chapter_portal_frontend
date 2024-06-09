<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useActionsStore } from '~/stores/actions';
import { useAllocationsStore } from '~/stores/allocations';
import { useCommitteesStore } from '~/stores/committees';

definePageMeta({
    layout: 'health'
});

async function fetchData() {
    try {
        // Make the API call
        await useActionsStore().fetchMyActions();
    } catch (error) {
        // Handle any errors here
        console.error('fetchMyActions error:', error);
        console.error(error);
    }
    try {
        // Make the API call
        await useAllocationsStore().fetchMyAllocations();
    } catch (error) {
        // Handle any errors here
        console.error('fetchMyAllocations error:', error);
        console.error(error);
    }
    try {
        // Make the API call
        await useCommitteesStore().fetchMyCommitteeAllocations();
    } catch (error) {
        // Handle any errors here
        console.error('fetchMyCommitteeAllocations error:', error);
        console.error(error);
    }
}

onBeforeMount(() => {
    // Call fetchData when the component is about to be mounted
    fetchData();
});
</script>

<template>
    <h1>NatCom Portal</h1>
    <Card class="mb-2">
        <template v-slot:title>
            <div class="flex align-items-center justify-content-between mb-0">
                <h5>Introduction</h5>
            </div>
        </template>

        <template v-slot:content>
            <h6>What?</h6>
            <ul>
                <li>NatCom Portal is a website for us to track chapter health, updates, minutes and visits.</li>
            </ul>
            <h6>Why?</h6>
            <ul>
                <li>Centralised, efficient, easy to see and keep track</li>
            </ul>
        </template>
    </Card>
    <Card class="mb-2">
        <template v-slot:title>
            <div class="flex align-items-center justify-content-between mb-0">
                <h5>Actions</h5>
            </div>
        </template>

        <template v-slot:content>
            <DataTable :value="useActionsStore().chapterActions" tableStyle="min-width: 50rem">
                <Column field="chapter_name" header="Chapters"></Column>
                <Column field="note" header="Note"></Column>
                <Column field="due_date" header="Due Date"></Column>
            </DataTable>
        </template>
    </Card>
    <Card class="mb-2">
        <template v-slot:title>
            <div class="flex align-items-center justify-content-between mb-0">
                <h5>Chapter Allocations</h5>
            </div>
        </template>

        <template v-slot:content>
            <DataTable :value="useAllocationsStore().chapterAllocations" tableStyle="min-width: 50rem">
                <Column field="chapter_name" header="Chapters"></Column>
            </DataTable>
        </template>
    </Card>
    <Card class="mb-2">
        <template v-slot:title>
            <div class="flex align-items-center justify-content-between mb-0">
                <h5>Committee Allocations</h5>
            </div>
        </template>

        <template v-slot:content>
            <DataTable :value="useCommitteesStore().chapterCommittees" tableStyle="min-width: 50rem">
                <Column field="chapter_name" header="Chapter"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="position" header="Position"></Column>
            </DataTable>
        </template>
    </Card>
</template>
