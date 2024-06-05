import { defineStore } from 'pinia';
import { RuntimeConfig } from '@nuxt/schema';
import { useAuthStore } from '~/stores/auth';

export const useActionsStore = defineStore({
    id: 'actions',
    state: () => ({
        chapterActions: [] as any[],
        assignees: [] as any[]
    }),
    actions: {
        async fetchChaptersActions(chapter_id: string) {
            this.chapterActions = await apiFetch(`/actions/chapter/${chapter_id}`, {});

            return this.chapterActions;
        },
        async saveChapterAction(action_id: string, chapter_id: string, assignee_name: string, section_id: string, note: string, due_date: string) {
            console.log(note);
            return await apiFetch(`/action/${action_id}`, {
                method: 'PUT',

                body: {
                    chapter_id: chapter_id,
                    assignee_name: assignee_name,
                    section_id: section_id,
                    note: note,
                    due_date: due_date
                }
            });
        },
        async postChapterAction(chapter_id: string, assignee_name: string, section_id: string, note: string, due_date: string) {
            return await apiFetch(`/action`, {
                method: 'POST',

                body: {
                    chapter_id,
                    assignee_name,
                    section_id,
                    note,
                    due_date
                }
            });
        },
        async fetchAssignees() {
            this.assignees = await apiFetch(`/actions/assignees`, {});

            return this.assignees;
        }
    }
});
