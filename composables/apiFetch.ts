import type { UseFetchOptions } from '#app';
import { useAuthStore } from '~/stores/auth';

export default <T>(url: string, opts?: UseFetchOptions<T>): any => {
    const config = useRuntimeConfig();

    return $fetch(url, {
        baseURL: config.public.apiUrl,
        ...opts,
        headers: {
            Authorization: `Bearer ${useAuthStore().token}`
        }
    });
};
