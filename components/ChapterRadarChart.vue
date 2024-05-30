<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useLayout } from '@/layouts/composables/layout';
import { useSectionsStore } from '~/stores/sections';
import { useChaptersStore } from '~/stores/chapters';
import { useHealthStore } from '~/stores/health';


const props = defineProps<{
    chapter_id: string;
    year: string;
    month: string;
}>();

const chapters_store = useChaptersStore();
const health_store = useHealthStore();
const sections_store = useSectionsStore();

const { layoutConfig } = useLayout();

let documentStyle = ref(null);
let textColor = ref(null);
let textColorSecondary = ref(null);
let surfaceBorder = ref(null);

const radarData = ref(null);

const radarOptions = ref(null);

const chapter_name = ref('');

const chapter_comments = ref([]);

async function setColorOptions() {
    documentStyle.value = getComputedStyle(document.documentElement);
    textColor.value = documentStyle.value.getPropertyValue('--text-color');
    textColorSecondary.value = documentStyle.value.getPropertyValue('--text-color-secondary');
    surfaceBorder.value = documentStyle.value.getPropertyValue('--surface-border');
}

async function setChart(chapter_id: string, year: string, month: string) {
    await setColorOptions();
    chapter_name.value = (await chapters_store.fetchChapter(chapter_id)).name;
    radarData.value = {
        labels: sections_store.sections.map((section) => section.name),
        datasets: [
            {
                label: chapter_name.value,
                borderColor: documentStyle.value.getPropertyValue('--indigo-400'),
                pointBackgroundColor: documentStyle.value.getPropertyValue('--indigo-400'),
                pointBorderColor: documentStyle.value.getPropertyValue('--indigo-400'),
                pointHoverBackgroundColor: textColor,
                pointHoverBorderColor: documentStyle.value.getPropertyValue('--indigo-400'),
                data: await health_store.fetchAverageChapterHealth(chapter_id, year, month)
            }
        ]
    };

    radarOptions.value = {
        plugins: {
            legend: {
                labels: {
                    fontColor: textColor
                }
            }
        },
        scales: {
            r: {
                grid: {
                    color: textColorSecondary
                },
                min: 0,
                max: 10
            }
        }
    };
    chapter_comments.value = await health_store.fetchChapterComments(chapter_id, year, month);
}

onBeforeMount(() => {
    setColorOptions();
    setChart(props.chapter_id, props.year, props.month);
});

watch(
    () => props.chapter_id,
    async (newChapterId) => {
        setChart(newChapterId, props.year, props.month);
    }
);

watch(
    () => props.year,
    async (newYear) => {
        setChart(props.chapter_id, newYear, props.month);
    }
);

watch(
    () => props.month,
    async (newMonth) => {
        setChart(props.chapter_id, props.year, newMonth);
    }
);

const display = ref(false);

const open = () => {
    display.value = true;
};

const close = () => {
    display.value = false;
};
</script>

<template>
    <Dialog :header="chapter_name" v-model:visible="display" :breakpoints="{ '960px': '75vw' }"
            :style="{ width: '30vw' }" :modal="true">
        <p class="line-height-3 m-0">
            <div v-for="(comment, index) in chapter_comments" :key="index">
                {{ comment.section }} - {{ comment.comment }}
            </div>
        </p>
        <template #footer>
            <Button label="Ok" @click="close" icon="pi pi-check" class="p-button-outlined" />
        </template>
    </Dialog>
    <Chart type="radar" :data="radarData" :options="radarOptions" @click="open"></Chart>
</template>
