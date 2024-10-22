<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useEventsStore } from '~/stores/events';
import { useSectionsStore } from '~/stores/sections';

const emit = defineEmits(['updatesubmit']);

const props = defineProps({
    chapterId: {
        type: String,
        required: true
    }
});

const visible = ref(false);

const event_date = ref(null);
const event_name = ref(null);
const event_type = ref(null);

const toast = useToast();

async function save() {
    // Save the update
    if (!event_date.value || !event_name.value) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Due Date or note missing',
            life: 3000
        });
        return;
    }
    try {
        await useEventsStore().postChapterEvent(props.chapterId, event_name.value, event_date.value.toISOString().slice(0, 10));
        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Update saved successfully',
            life: 3000
        });
        visible.value = false;
        emit('updatesubmit');
    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: `Failed to save update: ${error}`,
            life: 3000
        });
    }
}

async function fetchData() {
    // Fetch data from the server
    try {
        // Make the API call
        await useEventsStore().fetchAssignees();
    } catch (error) {
        // Handle the error
        console.error(error);
    }
    try {
        // Make the API call
        await useSectionsStore().fetchSections();
    } catch (error) {
        // Handle the error
        console.error(error);
    }
}

onBeforeMount(() => {
    // Call fetchData when the component is about to be mounted
    fetchData();
});
</script>

<template>
    <Toast></Toast>
    <div class="card flex justify-content-center">
        <Button label="Add Event" @click="visible = true" />
        <Dialog v-model:visible="visible" modal header="Add Event" :style="{ width: '25rem' }">
            <span class="p-text-secondary block mb-5">Add an event.</span>
            <div class="align-items-center gap-3 mb-5">
                <label for="username" class="font-semibold w-6rem">Event Date</label>
                <br />
                <Calendar id="username" v-model="event_date" dateFormat="dd/mm/yy" showIcon :showOnFocus="false" />
            </div>
            <div class="align-items-center gap-3 mb-5">
                <label for="email" class="font-semibold w-6rem">Event Name</label>
                <br />
                <InputText v-model="event_name" autoResize rows="5" cols="30" />
            </div>

            <div class="align-items-center gap-3 mb-5">
                <label class="font-semibold w-6rem">Event Type: </label>
                <br />
                <Dropdown :options="useEventsStore().event_types" v-model="event_type" option-label="name"></Dropdown>
            </div>
            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
                <Button type="button" label="Save" @click="save"></Button>
            </div>
        </Dialog>
    </div>
</template>
