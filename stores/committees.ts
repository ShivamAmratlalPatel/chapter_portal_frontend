import { defineStore } from 'pinia';
import { RuntimeConfig } from '@nuxt/schema';
import { useAuthStore } from '~/stores/auth';

export const useCommitteesStore = defineStore({
    id: 'committees',
    state: () => ({
        chapterCommittees: [] as any[]
    }),
    actions: {
        async fetchChaptersCommittees(chapter_id: string) {
            this.chapterCommittees = await apiFetch(`/committee/chapter/${chapter_id}`, {});

            return this.chapterCommittees;
        },
        async saveChapterCommittee(committee_id: string, chapter_id: string, commencement_date: string, name: string, position: string, natcom_buddy_name: string) {
            return await apiFetch(`/committee/${committee_id}`, {
                method: 'PUT',

                body: {
                    chapter_id,
                    commencement_date,
                    name,
                    position,
                    natcom_buddy_name
                }
            });
        },
        async postChapterCommittee(chapter_id: string, commencement_date: string, name: string, position: string, natcom_buddy_name: string) {
            return await apiFetch(`/committee`, {
                method: 'POST',

                body: {
                    chapter_id,
                    commencement_date,
                    name,
                    position,
                    natcom_buddy_name
                }
            });
        },
        async fetchMyCommitteeAllocations() {
            this.chapterCommittees = await apiFetch(`/committee/chapter_buddy/me`, {});

            return this.chapterCommittees;
        }
    }
});
