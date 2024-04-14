<script setup lang="ts">
import { useHealthStore } from '~/stores/health';
import { useQuestionssStore } from '~/stores/questions';

const health_store = useHealthStore();
const questions_store = useQuestionssStore();

let props = defineProps({
    sectionid: Number,
    zone: String,
    year: String,
    month: String
});

const health_data = ref();

const columns = ref([]);
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

async function saveHealthScore(data) {
    console.log(data);
}

onBeforeMount(() => {
    // Call fetchData when the component is about to be mounted
    fetchData();
});
</script>

<template>
    <h3>{{ props.zone }}</h3>
    <div>
        <DataTable v-model:editing-rows="editingRows" :value="health_data" striped-rows show-gridlines edit-mode="row" @row-edit-save="(event) => saveHealthScore(event)">
            <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header">
                <template #editor="{ data, field }">
                    <InputText v-model="data[field]" />
                </template>
            </Column>
            <Column :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center"></Column>
        </DataTable>
    </div>
</template>
