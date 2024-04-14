<script setup lang="ts">
import { useQuestionssStore } from '~/stores/questions';
import { onBeforeMount, ref } from 'vue';
import { useHealthStore } from '~/stores/health';

const props = defineProps(['section_id']);

const health_store = useHealthStore();
const questions_store = useQuestionssStore();

async function fetchData() {
    try {
        // Make the API call
        const route = useRoute();
        await health_store.fetchHealthBySection(route.params.chapterid, props.section_id);
    } catch (error) {
        // Handle any errors here
        console.error('fetchHealth');
        console.error(error);
    }
    try {
        // Make the API call
        await questions_store.fetchQuestionChapter(props.section_id);
    } catch (error) {
        // Handle any errors here
        console.error('fetchQuestionChapters');
        console.error(error);
    }
}

onBeforeMount(() => {
    // Call fetchData when the component is about to be mounted
    fetchData();
});

onBeforeRouteUpdate((newRoute) => {
    fetchData();
});

const editingRows = ref();

async function saveHealthScore(data) {
    const route = useRoute();
    await health_store.saveHealth(route.params.chapterid, data.newData);
    await fetchData();
}
</script>

<template>
    <DataTable v-model:editing-rows="editingRows" :value="health_store.health" striped-rows show-gridlines edit-mode="row" @row-edit-save="(event) => saveHealthScore(event)">
        <Column v-for="col of questions_store.questions" :key="col.field" :field="col.field" :header="col.header">
            <template #editor="{ data, field }">
                <InputText v-model="data[field]" />
            </template>
        </Column>
        <Column :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center"></Column>
    </DataTable>
</template>

<style scoped lang="scss"></style>
