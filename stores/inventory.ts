import { defineStore } from 'pinia';
import type { RuntimeConfig } from 'nuxt/schema';
import { useAuthStore } from '~/stores/auth';

interface Inventory {
    id: string;
    name: string;
    description: string | null;
    quantity: number | null;
    category_id: string | null;
    location_id: string | null;
}

export const useInventoryStore = defineStore({
    id: 'inventory',
    state: () => ({
        inventory: [] as Inventory[]
    }),
    actions: {
        async fetchInventoryPagination(filters: any, sortField: any, sortOrder: any, rows: any, page: any) {
            const runtimeConfig: RuntimeConfig = useRuntimeConfig();

            let query_params: object = {};

            if (sortField !== null) {
                query_params['sort_field'] = sortField;
            }
            if (sortOrder !== null) {
                query_params['sort_order'] = sortOrder;
            }
            if (rows !== null) {
                query_params['rows'] = rows;
            }
            if (page !== null) {
                query_params['page'] = page;
            }

            return await $fetch<number>('inventory/pagination', {
                method: 'PUT',
                baseURL: runtimeConfig.public.apiUrl,
                headers: {
                    Authorization: `Bearer ${useAuthStore().token}`
                },
                body: filters,
                query: query_params
            });
        }
    }
});
