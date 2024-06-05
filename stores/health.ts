import { defineStore } from 'pinia';
import { RuntimeConfig } from '@nuxt/schema';
import { useAuthStore } from '~/stores/auth';

export const useHealthStore = defineStore({
    id: 'health',
    state: () => ({
        health: null
    }),
    actions: {
        async fetchHealth(chapter_id: string, year: number, month: number, week: number, question_id: number) {
            const runtimeConfig: RuntimeConfig = useNuxtApp().$config;

            this.health = await $fetch(`health/${chapter_id}/year/${year}/month/${month}/week/${week}/question/${question_id}`, {
                baseURL: runtimeConfig.public.apiUrl,
                headers: {
                    Authorization: `Bearer ${useAuthStore().token}`
                }
            });

            return this.health;
        },
        async saveHealth(chapter_id: string, data: any) {
            await apiFetch(`health/${chapter_id}`, {
                method: 'PUT',
                body: data
            });

            return this.health;
        },
        async fetchHealthBySection(chapter_id: string, section_id: number) {
            const runtimeConfig: RuntimeConfig = useNuxtApp().$config;

            this.health = await $fetch(`health/${chapter_id}/section/${section_id}`, {
                baseURL: runtimeConfig.public.apiUrl,
                headers: {
                    Authorization: `Bearer ${useAuthStore().token}`
                }
            });
        },
        async fetchHealthByZone(zone: string, year: number, month: number, week: number, section_id: number) {
            const runtimeConfig: RuntimeConfig = useNuxtApp().$config;

            this.health = await $fetch(`health/zone/${zone}/year/${year}/month/${month}/week/${week}/section/${section_id}`, {
                baseURL: runtimeConfig.public.apiUrl,
                headers: {
                    Authorization: `Bearer ${useAuthStore().token}`
                }
            });

            return this.health;
        },
        async fetchAverageChapterHealth(chapter_id: string, year: number, month: number, week: number) {
            const runtimeConfig: RuntimeConfig = useNuxtApp().$config;

            this.health = await $fetch(`health/${chapter_id}/year/${year}/month/${month}/week/${week}/average`, {
                baseURL: runtimeConfig.public.apiUrl,
                headers: {
                    Authorization: `Bearer ${useAuthStore().token}`
                }
            });

            return this.health;
        },
        async fetchChapterComments(chapter_id: string, year: number, month: number, week: number) {
            const runtimeConfig: RuntimeConfig = useNuxtApp().$config;

            this.health = await $fetch(`health/${chapter_id}/year/${year}/month/${month}/week/${week}/comments`, {
                baseURL: runtimeConfig.public.apiUrl,
                headers: {
                    Authorization: `Bearer ${useAuthStore().token}`
                }
            });

            return this.health;
        },
        async fetchLatestHealth(chapter_id: string) {
            const runtimeConfig: RuntimeConfig = useNuxtApp().$config;

            this.health = await $fetch(`health/${chapter_id}/latest`, {
                baseURL: runtimeConfig.public.apiUrl,
                headers: {
                    Authorization: `Bearer ${useAuthStore().token}`
                }
            });

            return this.health;
        }
    }
});
