<script setup lang="ts">
import { ref } from 'vue';
import { useCommitteesStore } from '~/stores/committees';

const emit = defineEmits(['updatesubmit']);

const props = defineProps({
    chapterId: {
        type: String,
        required: true
    }
});

const visible = ref(false);

const date = ref(new Date());
const name = ref(null);
const position = ref(null);

const toast = useToast();

async function save() {
    // Save the visit
    visible.value = false;
    try {
        await useCommitteesStore().postChapterCommittee(props.chapterId, date.value.toISOString().slice(0, 10), name.value, position.value);
        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Committee Member saved successfully',
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
        <Button label="Add Committee Member" @click="visible = true" />
        <Dialog v-model:visible="visible" modal header="Add Committee Member" :style="{ width: '25rem' }">
            <span class="p-text-secondary block mb-5">Add a chapter committee member.</span>
            <div class="flex align-items-center gap-3 mb-5">
                <FloatLabel>
                    <label for="username" class="font-semibold w-6rem">Commencement Date</label>
                    <Calendar id="username" v-model="date" dateFormat="dd/mm/yy" showIcon :showOnFocus="false" />
                </FloatLabel>
            </div>
            <div class="flex align-items-center gap-3 mb-5">
                <FloatLabel>
                    <label for="email" class="font-semibold w-6rem">Name</label>
                    <InputText v-model="name" autoResize rows="5" cols="30" />
                </FloatLabel>
            </div>
            <div class="flex align-items-center gap-3 mb-5">
                <FloatLabel>
                    <label for="email" class="font-semibold w-6rem">Role</label>
                    <InputText v-model="position" autoResize rows="5" cols="30" />
                </FloatLabel>
            </div>
            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
                <Button type="button" label="Save" @click="save"></Button>
            </div>
        </Dialog>
    </div>
</template>
