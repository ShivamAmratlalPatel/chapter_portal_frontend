<script setup lang="ts">
import { ref } from 'vue';
import { useUpdatesStore } from '~/stores/updates';
import { useInventoryStore } from '~/stores/inventory';

const emit = defineEmits(['updatesubmit']);

const visible = ref(false);

const name = ref(null);

const toast = useToast();

async function save() {
    // Save the update
    visible.value = false;
    try {
        await useInventoryStore().addCategory(name.value);
        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Category saved successfully',
            life: 3000
        });
        emit('updatesubmit');
    } catch {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to save category',
            life: 3000
        });
    }
}
</script>

<template>
    <Toast></Toast>
    <div class="card flex justify-content-center">
        <Button label="Add Category" @click="visible = true" />
        <Dialog v-model:visible="visible" modal header="Add Category" :style="{ width: '25rem' }">
            <span class="p-text-secondary block mb-5">Add a category.</span>

            <div class="flex align-items-center gap-3 mb-5">
                <FloatLabel>
                    <label for="email" class="font-semibold w-6rem">Category Name</label>
                    <Textarea v-model="name" autoResize rows="5" cols="30" />
                </FloatLabel>
            </div>
            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
                <Button type="button" label="Save" @click="save"></Button>
            </div>
        </Dialog>
    </div>
</template>
