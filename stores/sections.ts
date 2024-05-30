import { defineStore } from 'pinia';
import { RuntimeConfig } from '@nuxt/schema';
import apiFetch from '~/composables/apiFetch';

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

            this.sections = await apiFetch('sections', {
                baseURL: runtimeConfig.public.apiUrl
            });

            return this.sections;
        },
        async fetchSection(id: number) {
            const runtimeConfig: RuntimeConfig = useRuntimeConfig();

            this.section = await apiFetch(`section/${id}`, {
                baseURL: runtimeConfig.public.apiUrl
            });

            return this.section;
        }
    }
});
