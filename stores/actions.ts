import { defineStore } from 'pinia';
import { RuntimeConfig } from '@nuxt/schema';
import { useAuthStore } from '~/stores/auth';

export const useActionsStore = defineStore({
    id: 'actions',
    state: () => ({
        chapterActions: [] as any[]
    }),
    actions: {
        async fetchChaptersActions(chapter_id: string) {
            this.chapterActions = await apiFetch(`/actions/chapter/${chapter_id}`, {});

            return this.chapterActions;
        },
        async saveChapterAction(action_id: string, chapter_id: string, commencement_date: string, action_date: string, comments: string) {
            return await apiFetch(`/action/${action_id}`, {
                method: 'PUT',

                body: {
                    chapter_ids: [chapter_id],
                    commencement_date,
                    action_date,
                    comments
                }
            });
        },
        async postChapterAction(chapter_id: string, action_date: string, comments: string) {
            return await apiFetch(`/action`, {
                method: 'POST',

                body: {
                    chapter_ids: [chapter_id],
                    action_date,
                    comments
                }
            });
        }
    }
});
