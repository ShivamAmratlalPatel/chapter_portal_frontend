<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useSectionsStore } from '~/stores/sections';
import { useHealthStore } from '~/stores/health';

async function fetchData() {
    try {
        await useHealthStore().fetchLatestHealth(useRouter().currentRoute.value.params.chapterid);
    } catch (error) {
        console.log(error);
    }
}

function getBadgeSeverity(average: number) {
    if (average > 7) {
        return 'success';
    } else if (average > 4) {
        return 'info';
    } else {
        return 'warning';
    }
}

onBeforeMount(() => {
    // Call fetchData when the component is about to be mounted
    fetchData();
});
</script>
<template>
    <h2>Latest Health</h2>
    <div class="flex" v-if="useHealthStore().health">
        <div class="flex-auto mx-1" v-for="(health, index) in useHealthStore().health" :key="index">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div class="mr-1">
                        <span class="block text-500 font-medium mb-3">{{ health.section }}</span>
                        <Badge class="text-white font-medium text-xl" size="large" :severity="getBadgeSeverity(health.average)">
                            {{ health.average }}
                        </Badge>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width: 2.5rem; height: 2.5rem"><i :class="health.icon"></i></div>
                </div>
            </div>
        </div>
    </div>
</template>
