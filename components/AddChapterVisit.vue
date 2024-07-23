<script setup lang="ts">
import { ref } from 'vue';
import { useVisitsStore } from '~/stores/visits';

const emit = defineEmits(['updatesubmit']);

const props = defineProps({
    chapterId: {
        type: String,
        required: true
    }
});

const visible = ref(false);

const date = ref(new Date());
const comments = ref(null);

const toast = useToast();

async function save() {
    // Save the visit
    visible.value = false;
    try {
        await useVisitsStore().postChapterVisit(props.chapterId, date.value.toISOString().slice(0, 10), comments.value);
        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Visit saved successfully',
            life: 3000
        });
        emit('updatesubmit');
    } catch {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to save visit',
            life: 3000
        });
    }
}
</script>

<template>
    <Toast></Toast>
    <div class="card flex justify-content-center">
        <Button label="Add Visit" @click="visible = true" />
        <Dialog v-model:visible="visible" modal header="Add Visit" :style="{ width: '25rem' }">
            <span class="p-text-secondary block mb-5">Add a visit.</span>
            <div class="flex align-items-center gap-3 mb-5">
                <FloatLabel>
                    <label for="username" class="font-semibold w-6rem">Visits</label>
                    <Calendar id="username" v-model="date" dateFormat="dd/mm/yy" showIcon :showOnFocus="false" />
                </FloatLabel>
            </div>

            <div class="flex align-items-center gap-3 mb-5">
                <FloatLabel>
                    <label for="email" class="font-semibold w-6rem">Comments</label>
                    <Textarea v-model="comments" rows="5" cols="30" />
                </FloatLabel>
            </div>
            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
                <Button type="button" label="Save" @click="save"></Button>
            </div>
        </Dialog>
    </div>
</template>
