<script setup lang="ts">
const router = useRoute();

const section_id = ref(router.params.sectionid);
</script>

<template>
    <div>
        <h1>Section {{ section_id }}</h1>
    </div>
</template>

<style scoped lang="scss"></style>
