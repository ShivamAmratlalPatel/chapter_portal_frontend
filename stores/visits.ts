import { defineStore } from 'pinia';
import { RuntimeConfig } from '@nuxt/schema';
import { useAuthStore } from '~/stores/auth';
import apiFetch from '~/composables/apiFetch';

export const useVisitsStore = defineStore({
    id: 'visits',
    state: () => ({
        chapterVisits: [] as any[]
    }),
    actions: {
        async fetchChaptersVisits(chapter_id: string) {
            this.chapterVisits = await apiFetch(`/visits/chapter/${chapter_id}`, {
                headers: {
                    Authorization: `Bearer ${useAuthStore().token}`
                }
            });

            return this.chapterVisits;
        },
        async saveChapterVisit(visit_id: string, chapter_ids: Array<string>, visit_date: string, visit_category_id: string, comments: string) {
            return await apiFetch(`/visit/${visit_id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${useAuthStore().token}`
                },
                body: {
                    chapter_ids,
                    visit_date,
                    visit_category_id,
                    comments
                }
            });
        },
        async postChapterVisit(chapter_ids: Array<string>, visit_date: string, visit_category_id: string, comments: string) {
            const runtimeConfig: RuntimeConfig = useRuntimeConfig();

            return await apiFetch(`/visit`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${useAuthStore().token}`
                },
                body: {
                    chapter_ids,
                    visit_date,
                    visit_category_id,
                    comments
                }
            });
        }
    }
});
