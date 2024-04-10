import { defineStore } from 'pinia';
import { RuntimeConfig } from '@nuxt/schema';

export interface Section {
    id: number;
    name: string;
    is_deleted: boolean;
}

export const useSectionsStore = defineStore({
    id: 'sections',
    state: () => ({
        sections: [] as unknown as Section[]
    }),
    actions: {
        async fetchSections() {
            const runtimeConfig: RuntimeConfig = useRuntimeConfig();

            this.sections = await $fetch('sections', {
                baseURL: runtimeConfig.public.apiUrl
            });

            return this.sections;
        }
    }
});
