import { defineStore } from 'pinia';
import { RuntimeConfig } from '@nuxt/schema';
import apiFetch from '~/composables/apiFetch';

export const useHealthStore = defineStore({
    id: 'health',
    state: () => ({
        health: null
    }),
    actions: {
        async fetchHealth(chapter_id: string, year: number, month: number, question_id: number) {
            this.health = await apiFetch(`health/${chapter_id}/year/${year}/month/${month}/question/${question_id}`, {});

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
            this.health = await apiFetch(`health/${chapter_id}/section/${section_id}`, {});
        },
        async fetchHealthByZone(zone: string, year: number, month: number, section_id: number) {
            this.health = await apiFetch(`health/zone/${zone}/year/${year}/month/${month}/section/${section_id}`, {});

            return this.health;
        },
        async fetchAverageChapterHealth(chapter_id: string, year: number, month: number) {
            this.health = await apiFetch(`health/${chapter_id}/year/${year}/month/${month}/average`, {});

            return this.health;
        },
        async fetchChapterComments(chapter_id: string, year: number, month: number) {
            this.health = await apiFetch(`health/${chapter_id}/year/${year}/month/${month}/comments`, {});

            return this.health;
        }
    }
});
