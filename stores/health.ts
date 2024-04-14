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
        async saveHealth(chapter_id: string, data: any) {
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
        },
        async fetchHealthByZone(zone: string, year: number, month: number, section_id: number) {
            const runtimeConfig: RuntimeConfig = useRuntimeConfig();

            this.health = await $fetch(`health/zone/${zone}/year/${year}/month/${month}/section/${section_id}`, {
                baseURL: runtimeConfig.public.apiUrl
            });

            return this.health;
        }
    }
});
