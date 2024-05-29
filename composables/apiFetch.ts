import type { UseFetchOptions } from '#app';
import { useAuthStore } from '~/stores/auth';

export default <T>(url: string, opts?: UseFetchOptions<T>): any => {
    const config = useRuntimeConfig();

    opts = { ...opts, headers: { ...opts?.headers, Authorization: `Bearer ${useAuthStore().token}` } };

    return $fetch(url, { baseURL: config.public.apiURL, ...opts });
};
