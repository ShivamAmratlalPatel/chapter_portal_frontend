<script setup lang="ts">
import { useLayout } from './composables/layout';
import { computed } from 'vue';
const { layoutConfig } = useLayout();
const logoUrl = computed(() => {
    return `/layout/images/${layoutConfig.darkTheme.value ? 'om-orange' : 'om-orange'}.png`;
});
</script>

<template>
    <div class="layout-footer">
        <img :src="logoUrl" alt="Logo" height="20" class="mr-2" />
        by
        <span class="font-medium ml-2">NHSF (UK)</span>
    </div>
</template>
<style lang="scss" scoped></style>
