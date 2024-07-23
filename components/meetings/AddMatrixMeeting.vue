<script setup lang="ts">
import { ref } from 'vue';
import { useMatrixMeetingsStore } from '~/stores/matrix_meetings';

const emit = defineEmits(['updatesubmit']);

const props = defineProps({
    zone: {
        type: String,
        required: true
    }
});

const visible = ref(false);

const date = ref(new Date());
const agenda = ref(null);
const minutes_link = ref(null);

const toast = useToast();

async function save() {
    // Save the visit
    visible.value = false;
    try {
        await useMatrixMeetingsStore().postMatrixMeeting(props.zone, date.value.toISOString().slice(0, 10), agenda.value, minutes_link.value);
        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Matrix Meeting saved successfully',
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
        <Button label="Add Matrix Meetings" @click="visible = true" />
        <Dialog v-model:visible="visible" modal header="Add Matrix Meeting" :style="{ width: '25rem' }">
            <span class="p-text-secondary block mb-5">Add a matrix meeting.</span>
            <div class="flex align-items-center gap-3 mb-5">
                <FloatLabel>
                    <label for="username" class="font-semibold w-6rem">Meeting Date</label>
                    <Calendar id="username" v-model="date" dateFormat="dd/mm/yy" showIcon :showOnFocus="false" />
                </FloatLabel>
            </div>
            <div class="flex align-items-center gap-3 mb-5">
                <FloatLabel>
                    <label for="email" class="font-semibold w-6rem">Agenda</label>
                    <Textarea v-model="agenda" autoResize rows="5" cols="30" />
                </FloatLabel>
            </div>
            <div class="flex align-items-center gap-3 mb-5">
                <FloatLabel>
                    <label for="email" class="font-semibold w-6rem">Minutes Link</label>
                    <InputText v-model="minutes_link" autoResize rows="5" cols="30" />
                </FloatLabel>
            </div>
            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
                <Button type="button" label="Save" @click="save"></Button>
            </div>
        </Dialog>
    </div>
</template>
