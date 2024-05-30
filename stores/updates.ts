import { defineStore } from 'pinia';
import { RuntimeConfig } from '@nuxt/schema';
import { useAuthStore } from '~/stores/auth';

export const useUpdatesStore = defineStore({
    id: 'updates',
    state: () => ({
        chaptersUpdates: [] as any[],
        sectionsUpdates: [] as any[]
    }),
    actions: {
        async fetchChaptersUpdates(chapter_id: string) {
            const runtimeConfig: RuntimeConfig = useNuxtApp().$config;

            this.chaptersUpdates = await $fetch(`/chapter_update/chapter/${chapter_id}`, {
                baseURL: runtimeConfig.public.apiUrl,
                headers: {
                    Authorization: `Bearer ${useAuthStore().token}`
                }
            });

            return this.chaptersUpdates;
        },
        async saveChapterUpdate(update_id: string, chapter_id: string, update_date: string, update_text: string) {
            const runtimeConfig: RuntimeConfig = useNuxtApp().$config;

            return await $fetch(`/chapter_update/${update_id}`, {
                method: 'PUT',
                baseURL: runtimeConfig.public.apiUrl,
                headers: {
                    Authorization: `Bearer ${useAuthStore().token}`
                },
                body: {
                    chapter_id: chapter_id,
                    update_date: update_date,
                    update_text: update_text
                }
            });
        },
        async fetchSectionsUpdate(chapter_id: string) {
            const runtimeConfig: RuntimeConfig = useNuxtApp().$config;

            this.sectionsUpdates = await $fetch(`/section_update/section/${chapter_id}`, {
                baseURL: runtimeConfig.public.apiUrl,
                headers: {
                    Authorization: `Bearer ${useAuthStore().token}`
                }
            });

            return this.sectionsUpdates;
        },
        async saveSectionUpdate(update_id: string, section_id: string, update_date: string, update_text: string) {
            const runtimeConfig: RuntimeConfig = useNuxtApp().$config;

            return await $fetch(`/section_update/${update_id}`, {
                method: 'PUT',
                baseURL: runtimeConfig.public.apiUrl,
                headers: {
                    Authorization: `Bearer ${useAuthStore().token}`
                },
                body: {
                    section_id: section_id,
                    update_date: update_date,
                    update_text: update_text
                }
            });
        }
    }
});
