import { defineStore } from 'pinia';
import { RuntimeConfig } from '@nuxt/schema';
import { useAuthStore } from '~/stores/auth';

export const useAllocationsStore = defineStore({
    id: 'allocations',
    state: () => ({
        chapterAllocations: [] as any[]
    }),
    actions: {
        async fetchChaptersAllocations(chapter_id: string) {
            this.chapterAllocations = await apiFetch(`/allocations/chapter/${chapter_id}`, {});

            return this.chapterAllocations;
        },
        async saveChapterAllocation(allocation_id: string, chapter_id: string, section_id: string) {
            return await apiFetch(`/allocation/${allocation_id}`, {
                method: 'PUT',

                body: {
                    chapter_id,
                    section_id
                }
            });
        },
        async postChapterAllocation(chapter_id: string, section_id: string) {
            return await apiFetch(`/allocation`, {
                method: 'POST',

                body: {
                    chapter_id,
                    section_id
                }
            });
        }
    }
});
