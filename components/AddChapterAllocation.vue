<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useAllocationsStore } from '~/stores/allocations';
import { useSectionsStore } from '~/stores/sections';
import { useActionsStore } from '~/stores/actions';

const emit = defineEmits(['updatesubmit']);

const props = defineProps({
    chapterId: {
        type: String,
        required: true
    }
});

const visible = ref(false);

const section = ref(null);
const assignee = ref(null);

const toast = useToast();

async function save() {
    // Save the update
    visible.value = false;
    try {
        await useAllocationsStore().postChapterAllocation(props.chapterId, section.value?.id, assignee.value?.full_name);
        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Update saved successfully',
            life: 3000
        });
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
        await useActionsStore().fetchAssignees();
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
        <Button label="Add Allocation" @click="visible = true" />
        <Dialog v-model:visible="visible" modal header="Add Allocation" :style="{ width: '25rem' }">
            <span class="p-text-secondary block mb-5">Add an allocation.</span>
            <div class="align-items-center gap-3 mb-5">
                <label class="font-semibold w-6rem">Name: </label>
                <br />
                <Dropdown :options="useActionsStore().assignees" v-model="assignee" option-label="full_name"></Dropdown>
            </div>
            <div class="align-items-center gap-3 mb-5">
                <label class="font-semibold w-6rem">Team (can be left blank): </label>
                <br />
                <Dropdown :options="useSectionsStore().sections" v-model="section" option-label="name"></Dropdown>
            </div>
            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
                <Button type="button" label="Save" @click="save"></Button>
            </div>
        </Dialog>
    </div>
</template>
