<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useActionsStore } from '~/stores/actions';
import { useSectionsStore } from '~/stores/sections';

const emit = defineEmits(['updatesubmit']);

const props = defineProps({
    chapterId: {
        type: String,
        required: true
    }
});

const visible = ref(false);

const date = ref(null);
const note = ref(null);
const section = ref(null);
const assignee = ref(null);

const toast = useToast();

async function save() {
    // Save the update
    if (!date.value || !note.value) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Due Date or note missing',
            life: 3000
        });
        return;
    }
    try {
        await useActionsStore().postChapterAction(props.chapterId, assignee.value?.full_name, section.value?.id, note.value, date.value.toISOString().slice(0, 10));
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
        <Button label="Add Action" @click="visible = true" />
        <Dialog v-model:visible="visible" modal header="Add Action" :style="{ width: '25rem' }">
            <span class="p-text-secondary block mb-5">Add an action.</span>
            <div class="align-items-center gap-3 mb-5">
                <label for="username" class="font-semibold w-6rem">Due Date</label>
                <br />
                <Calendar id="username" v-model="date" dateFormat="dd/mm/yy" showIcon :showOnFocus="false" />
            </div>
            <div class="align-items-center gap-3 mb-5">
                <label for="email" class="font-semibold w-6rem">Note</label>
                <br />
                <Textarea v-model="note" autoResize rows="5" cols="30" />
            </div>
            <div class="align-items-center gap-3 mb-5">
                <label class="font-semibold w-6rem">Team (can be left blank): </label>
                <br />
                <Dropdown :options="useSectionsStore().sections" v-model="section" option-label="name"></Dropdown>
            </div>
            <div class="align-items-center gap-3 mb-5">
                <label class="font-semibold w-6rem">Assignee: </label>
                <br />
                <Dropdown :options="useActionsStore().assignees" v-model="assignee" option-label="full_name"></Dropdown>
            </div>
            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
                <Button type="button" label="Save" @click="save"></Button>
            </div>
        </Dialog>
    </div>
</template>
