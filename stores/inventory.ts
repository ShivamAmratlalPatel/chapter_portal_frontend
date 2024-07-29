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
        },
        async fetchInventoryCategoryPagination(filters: any, sortField: any, sortOrder: any, rows: any, page: any) {
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

            return await $fetch<number>('inventory/category/pagination', {
                method: 'PUT',
                baseURL: runtimeConfig.public.apiUrl,
                headers: {
                    Authorization: `Bearer ${useAuthStore().token}`
                },
                body: filters,
                query: query_params
            });
        },
        async deleteCategory(id: string) {
            const runtimeConfig: RuntimeConfig = useRuntimeConfig();

            return await $fetch<number>(`inventory/category/${id}`, {
                method: 'DELETE',
                baseURL: runtimeConfig.public.apiUrl,
                headers: {
                    Authorization: `Bearer ${useAuthStore().token}`
                }
            });
        },
        async editCategory(id: string, name: string) {
            const runtimeConfig: RuntimeConfig = useRuntimeConfig();

            return await $fetch<number>(`inventory/category/${id}`, {
                method: 'PUT',
                baseURL: runtimeConfig.public.apiUrl,
                headers: {
                    Authorization: `Bearer ${useAuthStore().token}`
                },
                body: {
                    name
                }
            });
        },
        async addCategory(name: string) {
            const runtimeConfig: RuntimeConfig = useRuntimeConfig();

            return await $fetch<number>('inventory/category', {
                method: 'POST',
                baseURL: runtimeConfig.public.apiUrl,
                headers: {
                    Authorization: `Bearer ${useAuthStore().token}`
                },
                body: {
                    name
                }
            });
        },
        async fetchInventoryLocationPagination(filters: any, sortField: any, sortOrder: any, rows: any, page: any) {
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

            return await $fetch<number>('inventory/location/pagination', {
                method: 'PUT',
                baseURL: runtimeConfig.public.apiUrl,
                headers: {
                    Authorization: `Bearer ${useAuthStore().token}`
                },
                body: filters,
                query: query_params
            });
        },
        async deleteLocation(id: string) {
            const runtimeConfig: RuntimeConfig = useRuntimeConfig();

            return await $fetch<number>(`inventory/location/${id}`, {
                method: 'DELETE',
                baseURL: runtimeConfig.public.apiUrl,
                headers: {
                    Authorization: `Bearer ${useAuthStore().token}`
                }
            });
        },
        async editLocation(id: string, name: string) {
            const runtimeConfig: RuntimeConfig = useRuntimeConfig();

            return await $fetch<number>(`inventory/location/${id}`, {
                method: 'PUT',
                baseURL: runtimeConfig.public.apiUrl,
                headers: {
                    Authorization: `Bearer ${useAuthStore().token}`
                },
                body: {
                    name
                }
            });
        },
        async addLocation(name: string) {
            const runtimeConfig: RuntimeConfig = useRuntimeConfig();

            return await $fetch<number>('inventory/location', {
                method: 'POST',
                baseURL: runtimeConfig.public.apiUrl,
                headers: {
                    Authorization: `Bearer ${useAuthStore().token}`
                },
                body: {
                    name
                }
            });
        }
    }
});
