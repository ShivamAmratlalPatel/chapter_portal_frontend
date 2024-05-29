<script setup lang="ts">
import { useSectionsStore } from '~/stores/sections';

const sections_store = useSectionsStore();
</script>

<template>
    <div v-if="sections_store.section && sections_store.section.name">
        <h1>{{ sections_store.section.name }} Team Updates</h1>
    </div>
</template>
