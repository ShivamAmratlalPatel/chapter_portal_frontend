<script setup lang="ts">
definePageMeta({
    layout: 'health'
});

const zone = ref();

async function fetchData() {
    const route = useRoute();
    zone.value = route.params.zone;
}

onMounted(() => {
    // Call fetchData when the component is about to be mounted
    reloadNuxtApp();
    fetchData();
});
</script>

<template>
    <h1>{{ useRoute().params.zone }}</h1>
</template>
