<script setup lang="ts">
import { useQuestionssStore } from '~/stores/questions';
import { onBeforeMount, ref } from 'vue';
import { useHealthStore } from '~/stores/health';

const props = defineProps(['section_id']);

const health_store = useHealthStore();
const questions_store = useQuestionssStore();

const toggleOverlay = (event) => {
    for (let i = 0; i < questions_store.questions.length; i++) {
        if (questions_store.questions[i].field === event.field) {
            questions_store.questions[i].overlay_panel = true;
        }
    }
};

const close = (event) => {
    for (let i = 0; i < questions_store.questions.length; i++) {
        if (questions_store.questions[i].field === event.field) {
            questions_store.questions[i].overlay_panel = false;
        }
    }
};
async function fetchHealth(chapter_id: string) {
    try {
        // Make the API call
        await health_store.fetchHealthBySection(chapter_id, props.section_id);
    } catch (error) {
        // Handle any errors here
        console.error('fetchHealthbySection');
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

async function fetchData() {
    try {
        // Make the API call
        const route = useRoute();
        await fetchHealth(route.params.chapterid);
    } catch (error) {
        // Handle any errors here
        console.error('fetchHealth');
        console.error(error);
    }
}

onBeforeMount(() => {
    // Call fetchData when the component is about to be mounted
    fetchData();
});

onBeforeRouteUpdate((newRoute) => {
    fetchHealth(newRoute.params.chapterid);
});

const editingRows = ref();

const toast = useToast();

async function saveHealthScore(data) {
    const route = useRoute();
    try {
        await health_store.saveHealth(route.params.chapterid, data.newData);
        toast.add({ severity: 'success', summary: 'Health Saved', detail: 'Health saved successfully', life: 3000 });
    } catch (error) {
        console.error('saveHealth');
        console.error(error);
        try {
            toast.add({ severity: 'error', summary: 'Error Saving Health', detail: `${error.data.detail}`, life: 3000 });
        } catch (error) {
            toast.add({ severity: 'error', summary: 'Error Saving Health', detail: 'Error saving health', life: 3000 });
        }
    }
    await fetchData();
}
</script>

<template>
    <Toast></Toast>
    <DataTable v-model:editing-rows="editingRows" :value="health_store.health" striped-rows show-gridlines edit-mode="row" @row-edit-save="(event) => saveHealthScore(event)">
        <Column v-for="col of questions_store.questions" :key="col.field" :field="col.field">
            <template #header>
                {{ col.header }}
                <div v-if="col.rag_guide">
                    <Button icon="pi pi-question" text raised rounded class="ml-2" @click="toggleOverlay(col)" />
                    <Dialog :header="'RAG Guide: ' + col.header" v-model:visible="col.overlay_panel" :breakpoints="{ '960px': '75vw' }" :style="{ width: '30vw' }" :modal="true">
                        <p class="line-height-3 m-0">{{ col.rag_guide }}</p>
                        <template #footer>
                            <Button label="Ok" @click="close(col)" icon="pi pi-check" class="p-button-outlined" />
                        </template>
                    </Dialog>
                </div>
            </template>
            <template #editor="{ data, field }">
                <InputText v-model="data[field]" />
            </template>
        </Column>
        <Column :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center"></Column>
    </DataTable>
</template>

<style scoped lang="scss"></style>
