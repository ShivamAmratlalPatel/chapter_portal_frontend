<script setup lang="ts">
import { ref } from 'vue';
import { useUpdatesStore } from '~/stores/updates';

const emit = defineEmits(['updatesubmit']);

const props = defineProps({
    chapterId: {
        type: String,
        required: true
    }
});

const visible = ref(false);

const date = ref(new Date());
const update = ref(null);

const toast = useToast();

async function save() {
    // Save the update
    visible.value = false;
    try {
        await useUpdatesStore().postChapterUpdate(props.chapterId, date.value.toISOString().slice(0, 10), update.value);
        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Update saved successfully',
            life: 3000
        });
        emit('updatesubmit');
    } catch {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to save update',
            life: 3000
        });
    }
}
</script>

<template>
    <Toast></Toast>
    <div class="card flex justify-content-center">
        <Button label="Add Action" @click="visible = true" />
        <Dialog v-model:visible="visible" modal header="Add Update" :style="{ width: '25rem' }">
            <span class="p-text-secondary block mb-5">Add a chapter update.</span>
            <div class="flex align-items-center gap-3 mb-5">
                <FloatLabel>
                    <label for="username" class="font-semibold w-6rem">Date</label>
                    <Calendar id="username" v-model="date" dateFormat="dd/mm/yy" showIcon :showOnFocus="false" />
                </FloatLabel>
            </div>
            <div class="flex align-items-center gap-3 mb-5">
                <FloatLabel>
                    <label for="email" class="font-semibold w-6rem">Update</label>
                    <Textarea v-model="update" autoResize rows="5" cols="30" />
                </FloatLabel>
            </div>
            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
                <Button type="button" label="Save" @click="save"></Button>
            </div>
        </Dialog>
    </div>
</template>
