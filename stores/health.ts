import { defineStore } from 'pinia';
import { RuntimeConfig } from '@nuxt/schema';

export const useHealthStore = defineStore({
    id: 'health',
    state: () => ({
        health: null
    }),
    actions: {
        async fetchHealth(chapter_id: string, year: number, month: number, question_id: number) {
            const runtimeConfig: RuntimeConfig = useRuntimeConfig();

            this.health = await $fetch(`health/${chapter_id}/year/${year}/month/${month}/question/${question_id}`, {
                baseURL: runtimeConfig.public.apiUrl
            });

            return this.health;
        },
        async saveHealth(chapter_id: string, data) {
            const runtimeConfig: RuntimeConfig = useRuntimeConfig();

            this.health = await $fetch(`health/${chapter_id}`, {
                baseURL: runtimeConfig.public.apiUrl,
                method: 'PUT',
                body: data
            });

            return this.health;
        },
        async fetchHealthBySection(chapter_id: string, section_id: number) {
            const runtimeConfig: RuntimeConfig = useRuntimeConfig();

            this.health = await $fetch(`health/${chapter_id}/section/${section_id}`, {
                baseURL: runtimeConfig.public.apiUrl
            });
        }
    }
});
