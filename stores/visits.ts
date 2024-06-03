import { defineStore } from 'pinia';
import { RuntimeConfig } from '@nuxt/schema';
import { useAuthStore } from '~/stores/auth';

export const useVisitsStore = defineStore({
    id: 'visits',
    state: () => ({
        chapterVisits: [] as any[]
    }),
    actions: {
        async fetchChaptersVisits(chapter_id: string) {
            const runtimeConfig: RuntimeConfig = useNuxtApp().$config;

            return await $fetch(`/visits/chapter/${chapter_id}`, {
                baseURL: runtimeConfig.public.apiURL,
                headers: {
                    Authorization: `Bearer ${useAuthStore().token}`
                }
            });
        },
        async saveChapterVisit(visit_id: string, chapter_ids: Array<string>, visit_date: string, visit_category_id: string, comments: string) {
            const runtimeConfig: RuntimeConfig = useNuxtApp().$config;

            return await $fetch(`/visit/${visit_id}`, {
                baseURL: runtimeConfig.public.apiURL,
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${useAuthStore().token}`
                },
                body: {
                    chapter_ids,
                    visit_date,
                    visit_category_id,
                    comments
                }
            });
        },
        async postChapterVisit(chapter_ids: Array<string>, visit_date: string, visit_category_id: string, comments: string) {
            const config: RuntimeConfig = useRuntimeConfig();

            return await $fetch(`/visit`, {
                baseURL: config.public.apiURL,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${useAuthStore().token}`
                },
                body: {
                    chapter_ids,
                    visit_date,
                    visit_category_id,
                    comments
                }
            });
        }
    }
});
