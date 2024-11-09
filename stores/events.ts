import { defineStore } from 'pinia';

export const useEventsStore = defineStore({
    id: 'events',
    state: () => ({
        chapterEvents: [] as any[],
        event_types: [] as any[]
    }),
    actions: {
        async fetchChaptersEvents(chapter_id: string) {
            this.chapterEvents = await apiFetch(`/events/chapter/${chapter_id}`, {});

            return this.chapterEvents;
        },
        async saveChapterEvent(event_id: string, chapter_id: string, assignee_name: string, section_id: string, note: string, due_date: string, completed_date: string) {
            console.log('due_date', due_date);
            return await apiFetch(`/event/${event_id}`, {
                method: 'PUT',

                body: {
                    chapter_id: chapter_id,
                    assignee_name: assignee_name,
                    section_id: section_id,
                    note: note,
                    due_date: due_date,
                    completed_date: completed_date
                }
            });
        },
        async postChapterEvent(chapter_id: string, event_name: string, event_date: string, event_type_id: string) {
            return await apiFetch(`/event`, {
                method: 'POST',

                body: {
                    chapter_ids: [chapter_id],
                    name: event_name,
                    event_date: event_date
                }
            });
        },
        async fetchAssignees() {
            this.event_types = await apiFetch(`/events/event_types`, {});

            return this.event_types;
        }
    }
});
