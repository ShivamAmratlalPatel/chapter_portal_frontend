import { defineStore } from 'pinia';
import { RuntimeConfig } from '@nuxt/schema';
import { useAuthStore } from '~/stores/auth';

export const useUpdatesStore = defineStore({
    id: 'updates',
    state: () => ({}),
    actions: {
        async fetchChaptersUpdates(chapter_id: string) {
            const runtimeConfig: RuntimeConfig = useRuntimeConfig();

            return await $fetch(`/chapter_update/chapter/${chapter_id}`, {
                baseURL: runtimeConfig.public.apiUrl,
                headers: {
                    Authorization: `Bearer ${useAuthStore().token}`
                }
            });
        },
        async saveUpdate(update_id: string, chapter_id: string, update_date: string, update_text: string) {
            const runtimeConfig: RuntimeConfig = useRuntimeConfig();

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
        }
    }
});
