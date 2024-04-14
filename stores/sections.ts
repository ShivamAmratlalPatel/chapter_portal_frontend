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
        section: {} as unknown as Section,
        sections: [] as unknown as Section[]
    }),
    actions: {
        async fetchSections() {
            const runtimeConfig: RuntimeConfig = useRuntimeConfig();

            this.sections = await $fetch('sections', {
                baseURL: runtimeConfig.public.apiUrl
            });

            return this.sections;
        },
        async fetchSection(id: number) {
            const runtimeConfig: RuntimeConfig = useRuntimeConfig();

            this.section = await $fetch(`section/${id}`, {
                baseURL: runtimeConfig.public.apiUrl
            });

            return this.section;
        }
    }
});
