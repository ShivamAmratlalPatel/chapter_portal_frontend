import { defineStore } from 'pinia';
import { RuntimeConfig } from '@nuxt/schema';

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
            const runtimeConfig: RuntimeConfig = useRuntimeConfig();

            this.questions = await $fetch(`questions/section/${section_id}`, {
                baseURL: runtimeConfig.public.apiUrl
            });

            return this.questions;
        },
        async fetchQuestionSection(section_id: number) {
            const runtimeConfig: RuntimeConfig = useRuntimeConfig();

            this.questions = await $fetch(`questions/section/${section_id}/section`, {
                baseURL: runtimeConfig.public.apiUrl
            });

            return this.questions;
        }
    }
});
