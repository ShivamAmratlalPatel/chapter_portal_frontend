import { defineStore } from 'pinia';
import { RuntimeConfig } from '@nuxt/schema';
import { useAuthStore } from '~/stores/auth';

export const useVisitsStore = defineStore({
    id: 'visits',
    state: () => ({
        chapterVisits: [] as any[]
    }),
    actions: {
        async fetchChaptersVisits(chapter_id: string) {
            this.chapterVisits = await apiFetch(`/visits/chapter/${chapter_id}`, {});

            return this.chapterVisits;
        },
        async saveChapterVisit(visit_id: string, chapter_id: string, commencement_date: string, visit_date: string, comments: string) {
            return await apiFetch(`/visit/${visit_id}`, {
                method: 'PUT',

                body: {
                    chapter_ids: [chapter_id],
                    commencement_date,
                    visit_date,
                    comments
                }
            });
        },
        async postChapterVisit(chapter_id: string, visit_date: string, comments: string) {
            return await apiFetch(`/visit`, {
                method: 'POST',

                body: {
                    chapter_ids: [chapter_id],
                    visit_date,
                    comments
                }
            });
        }
    }
});
