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
            this.sections = await apiFetch('sections', {});

            return this.sections;
        },
        async fetchSection(id: number) {
            this.section = await apiFetch(`section/${id}`, {});

            return this.section;
        }
    }
});
