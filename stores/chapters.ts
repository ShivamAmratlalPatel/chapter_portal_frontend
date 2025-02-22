import { defineStore } from 'pinia';
import { RuntimeConfig } from '@nuxt/schema';
import { useAuthStore } from '~/stores/auth';

export interface ChapterRead {
    id: string;
    name: string;
    email?: string;
    zone?: string;
    created_date: string;
    is_deleted: boolean;
    last_modified_date: string;
}

export interface NextPage {
    previous: boolean;
    cursor_column: string;
    cursor_id: string;
}

export interface PaginatedChapters {
    next: NextPage | null;
    previous: NextPage | null;
    results: ChapterRead[];
}

export interface ChapterList {
    label: string;
    icon: string;
    to: string;
}

export interface ChapterSidebar {
    label: string;
    items: ChapterList;
}

export interface Zone {
    id: string;
    name: string;
    is_deleted: boolean;
}

export const useChaptersStore = defineStore({
    id: 'chapters',
    state: () => ({
        chapters: {
            next: null,
            previous: null,
            results: []
        } as PaginatedChapters,
        chapter: null as unknown as ChapterRead,
        chapter_sidebar_list: null as unknown as ChapterSidebar[],
        zones: [] as unknown as Zone[],
        chapter_list: [] as unknown as ChapterList[]
    }),
    actions: {
        async fetchChapters(next_page: NextPage | null = null, filter_search: string | null = null) {
            const runtimeConfig: RuntimeConfig = useNuxtApp().$config;

            let endpoint = 'chapters';
            if (next_page !== null) {
                endpoint = `${endpoint}?cursor_id=${next_page.cursor_id}&cursor_column=${next_page.cursor_column}&previous=${next_page.previous}`;
                if (filter_search !== null) endpoint = `${endpoint}&filter_by=${filter_search}`;
            } else if (filter_search !== null) {
                endpoint = `chapters?filter_by=${filter_search}`;
            }

            this.chapters = await $fetch(endpoint, {
                baseURL: runtimeConfig.public.apiUrl,
                headers: {
                    Authorization: `Bearer ${useAuthStore().token}`
                }
            });

            return this.chapters;
        },
        async fetchAllChapters() {
            const runtimeConfig: RuntimeConfig = useNuxtApp().$config;

            this.chapter_sidebar_list = await $fetch('all_chapters', {
                baseURL: runtimeConfig.public.apiUrl,
                headers: {
                    Authorization: `Bearer ${useAuthStore().token}`
                }
            });

            return this.chapter_sidebar_list;
        },
        async fetchChapter(chapter_id: string) {
            const runtimeConfig: RuntimeConfig = useNuxtApp().$config;

            this.chapter = await $fetch(`chapter/${chapter_id}`, {
                baseURL: runtimeConfig.public.apiUrl,
                headers: {
                    Authorization: `Bearer ${useAuthStore().token}`
                }
            });

            return this.chapter;
        },
        async fetchZones() {
            const runtimeConfig: RuntimeConfig = useNuxtApp().$config;

            this.zones = await $fetch('zones', {
                baseURL: runtimeConfig.public.apiUrl,
                headers: {
                    Authorization: `Bearer ${useAuthStore().token}`
                }
            });

            return this.zones;
        },
        async fetchChapterByZone(zone: string) {
            const runtimeConfig: RuntimeConfig = useNuxtApp().$config;

            this.chapter_list = await $fetch(`chapters/${zone}`, {
                baseURL: runtimeConfig.public.apiUrl,
                headers: {
                    Authorization: `Bearer ${useAuthStore().token}`
                }
            });

            return this.chapter_list;
        }
    }
});
