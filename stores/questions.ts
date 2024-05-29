import { defineStore } from 'pinia';
import { RuntimeConfig } from '@nuxt/schema';
import apiFetch from '~/composables/apiFetch';

export interface Question {
    field: string;
    header: string;
}

export const useQuestionssStore = defineStore({
    id: 'questions',
    state: () => ({
        questions: [] as unknown as Question[]
    }),
    actions: {
        async fetchQuestionChapter(section_id: number) {
            this.questions = await apiFetch(`questions/section/${section_id}`, {});

            return this.questions;
        },
        async fetchQuestionSection(section_id: number) {
            this.questions = await apiFetch(`questions/section/${section_id}/section`, {});

            return this.questions;
        }
    }
});
