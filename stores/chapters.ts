import { defineStore } from 'pinia';
import { RuntimeConfig } from '@nuxt/schema';
import apiFetch from '~/composables/apiFetch';

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
            const runtimeConfig: RuntimeConfig = useRuntimeConfig();

            let endpoint = 'chapters';
            if (next_page !== null) {
                endpoint = `${endpoint}?cursor_id=${next_page.cursor_id}&cursor_column=${next_page.cursor_column}&previous=${next_page.previous}`;
                if (filter_search !== null) endpoint = `${endpoint}&filter_by=${filter_search}`;
            } else if (filter_search !== null) {
                endpoint = `chapters?filter_by=${filter_search}`;
            }

            this.chapters = await apiFetch(endpoint, {
                baseURL: runtimeConfig.public.apiUrl
            });

            return this.chapters;
        },
        async fetchAllChapters() {
            const runtimeConfig: RuntimeConfig = useRuntimeConfig();

            this.chapter_sidebar_list = await apiFetch('all_chapters', {
                baseURL: runtimeConfig.public.apiUrl
            });

            return this.chapter_sidebar_list;
        },
        async fetchChapter(chapter_id: string) {
            const runtimeConfig: RuntimeConfig = useRuntimeConfig();

            this.chapter = await apiFetch(`chapter/${chapter_id}`, {
                baseURL: runtimeConfig.public.apiUrl
            });

            return this.chapter;
        },
        async fetchZones() {
            const runtimeConfig: RuntimeConfig = useRuntimeConfig();

            this.zones = await apiFetch('zones', {
                baseURL: runtimeConfig.public.apiUrl
            });

            return this.zones;
        },
        async fetchChapterByZone(zone: string) {
            const runtimeConfig: RuntimeConfig = useRuntimeConfig();

            this.chapter_list = await apiFetch(`chapters/${zone}`, {
                baseURL: runtimeConfig.public.apiUrl
            });

            return this.chapter_list;
        }
    }
});
