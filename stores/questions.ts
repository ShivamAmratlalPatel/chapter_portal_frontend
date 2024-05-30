import { defineStore } from 'pinia';
import { RuntimeConfig } from '@nuxt/schema';
import { useAuthStore } from '~/stores/auth';

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
            const runtimeConfig: RuntimeConfig = useNuxtApp().$config;

            this.questions = await $fetch(`questions/section/${section_id}`, {
                baseURL: runtimeConfig.public.apiUrl,
                headers: {
                    Authorization: `Bearer ${useAuthStore().token}`
                }
            });

            return this.questions;
        },
        async fetchQuestionSection(section_id: number) {
            const runtimeConfig: RuntimeConfig = useNuxtApp().$config;

            this.questions = await $fetch(`questions/section/${section_id}/section`, {
                baseURL: runtimeConfig.public.apiUrl,
                headers: {
                    Authorization: `Bearer ${useAuthStore().token}`
                }
            });

            return this.questions;
        }
    }
});
