<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { useHealthStore } from '~/stores/health';

const health_store = useHealthStore();

let props = defineProps({
    display_show: Boolean,
    year: String,
    month: String
});

const yearDropdownValues = ref([
    { name: '2024', code: '2024' },
    { name: '2023', code: '2023' },
    { name: '2022', code: '2022' },
    { name: '2021', code: '2021' },
    { name: '2020', code: '2020' }
]);
const yearDropdownValue = ref(null);

const monthDropdownValues = ref([
    { name: 'January', code: '1' },
    { name: 'February', code: '2' },
    { name: 'March', code: '3' },
    { name: 'April', code: '4' },
    { name: 'May', code: '5' },
    { name: 'June', code: '6' },
    { name: 'July', code: '7' },
    { name: 'August', code: '8' },
    { name: 'September', code: '9' },
    { name: 'October', code: '10' },
    { name: 'November', code: '11' },
    { name: 'December', code: '12' }
]);
const monthDropdownValue = ref(null);

const sliderValue = ref();

const setYearMonth = (year: number, month: number) => {
    // convert year and month to strings
    const year_string = `${year}`;
    const month_string = `${month}`;
    // set the year and month dropdown values
    yearDropdownValue.value = yearDropdownValues.value.find((item) => item.name === year_string);
    monthDropdownValue.value = monthDropdownValues.value.find((item) => item.code === month_string);
};

defineExpose({
    setYearMonth
});
</script>

<template>
    <Dialog header="Dialog" v-model:visible="props.display_show" :breakpoints="{ '960px': '75vw' }" :style="{ width: '30vw' }" :modal="true">
        <div>
            <h5>Year</h5>
            <Dropdown v-model="yearDropdownValue" :options="yearDropdownValues" optionLabel="name" placeholder="Select" />
        </div>
        <div>
            <h5>Month</h5>
            <Dropdown v-model="monthDropdownValue" :options="monthDropdownValues" optionLabel="name" placeholder="Select" />
        </div>
        <div>
            <h5>Score</h5>
            <InputText v-model.number="sliderValue" />
            <Slider v-model="sliderValue" :min="0" :max="10" />
        </div>
        <template #footer>
            <Button label="Ok" @click="$emit('closeModal', yearDropdownValue, monthDropdownValue, sliderValue)" icon="pi pi-check" class="p-button-outlined" />
        </template>
    </Dialog>
</template>
