<script setup lang="ts">
import { reloadNuxtApp } from '#app';

definePageMeta({
    layout: 'health'
});

onMounted(() => {
    // Call fetchData when the component is about to be mounted
    reloadNuxtApp();
});
</script>

<template>
    <div>
        <SectionTable></SectionTable>
    </div>
</template>

<style scoped lang="scss"></style>
