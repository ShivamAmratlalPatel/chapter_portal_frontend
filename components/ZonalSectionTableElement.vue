<script setup lang="ts">
import { useHealthStore } from '~/stores/health';
import { useQuestionssStore } from '~/stores/questions';
import { ref } from 'vue';

const health_store = useHealthStore();
const questions_store = useQuestionssStore();

let props = defineProps({
    sectionid: Number,
    zone: String,
    year: String,
    month: String
});

const health_data = ref();
const editingRows = ref();
const columns = ref([]);

const toggleOverlay = (event) => {
    for (let i = 0; i < columns.value.length; i++) {
        if (columns.value[i].field === event.field) {
            columns.value[i].overlay_panel = true;
        }
    }
};

const close = (event) => {
    for (let i = 0; i < columns.value.length; i++) {
        if (columns.value[i].field === event.field) {
            columns.value[i].overlay_panel = false;
        }
    }
};

const fetchDataSection = async (section_id: string) => {
    try {
        // Make the API call
        columns.value = await questions_store.fetchQuestionSection(section_id);
    } catch (error) {
        // Handle any errors here
        console.error('fetchQuestionChapters');
        console.error(error);
    }
    try {
        // Make the API call
        health_data.value = await health_store.fetchHealthByZone(props.zone, props.year, props.month, section_id);
    } catch (error) {
        // Handle any errors here
        console.error('fetchHealth');
        console.error(error);
    }
};

const fetchData = async () => {
    try {
        // Make the API call
        columns.value = await questions_store.fetchQuestionSection(props.sectionid);
    } catch (error) {
        // Handle any errors here
        console.error('fetchQuestionChapters');
        console.error(error);
    }
    try {
        // Make the API call
        health_data.value = await health_store.fetchHealthByZone(props.zone, props.year, props.month, props.sectionid);
    } catch (error) {
        // Handle any errors here
        console.error('fetchHealth');
        console.error(error);
    }
};

onBeforeMount(() => {
    // Call fetchData when the component is about to be mounted
    fetchData();
});

onBeforeRouteUpdate((newRoute) => {
    // Call fetchData when the route is about to be updated
    props.sectionid = newRoute.params.sectionid;
    fetchDataSection(newRoute.params.sectionid);
});

const toast = useToast();

async function saveHealthScore(data) {
    const chapter_id = data.newData.chapter_id;
    delete data.newData.chapter_id;
    delete data.newData.chapter;
    delete data.newData.average;
    data.newData.year = props.year;
    data.newData.month = props.month;

    try {
        await health_store.saveHealth(chapter_id, data.newData);
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
    <h3>{{ props.zone }}</h3>
    <div>
        <DataTable v-model:editing-rows="editingRows" :value="health_data" striped-rows show-gridlines edit-mode="row" @row-edit-save="(event) => saveHealthScore(event)">
            <Column v-for="col of columns" :key="col.field" :field="col.field">
                <template #header>
                    {{ col.header }}
                    <div v-if="col.rag_guide">
                        <Button icon="pi pi-question" text raised rounded class="ml-2" @click="toggleOverlay(col)" />
                        <Dialog :header="'RAG Guide: ' + col.header" v-model:visible="col.overlay_panel" :breakpoints="{ '960px': '75vw' }" :style="{ width: '30vw' }" :modal="true">
                            <pre>{{ col.rag_guide }}</pre>
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
    </div>
</template>
