import { defineStore } from 'pinia';
import { RuntimeConfig } from '@nuxt/schema';
import { useAuthStore } from '~/stores/auth';

export interface Section {
    id: number;
    name: string;
    is_deleted: boolean;
}

export const useSectionsStore = defineStore({
    id: 'sections',
    state: () => ({
        section: {} as unknown as Section,
        sections: [] as unknown as Section[]
    }),
    actions: {
        async fetchSections() {
            const runtimeConfig: RuntimeConfig = useNuxtApp().$config;

            this.sections = await $fetch('sections', {
                baseURL: runtimeConfig.public.apiUrl,
                headers: {
                    Authorization: `Bearer ${useAuthStore().token}`
                }
            });

            return this.sections;
        },
        async fetchSection(id: number) {
            const runtimeConfig: RuntimeConfig = useNuxtApp().$config;

            this.section = await $fetch(`section/${id}`, {
                baseURL: runtimeConfig.public.apiUrl,
                headers: {
                    Authorization: `Bearer ${useAuthStore().token}`
                }
            });

            return this.section;
        }
    }
});
