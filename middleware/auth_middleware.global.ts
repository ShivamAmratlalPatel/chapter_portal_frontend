import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path.includes('internal')) {
        if (useAuthStore().loggedIn && useAuthStore().user?.user_type === 'admin') {
            return;
        } else {
            return useRouter().push({
                path: '/auth/access',
                query: {
                    next: to.path
                }
            });
        }
    } else if (to.path.includes('chapters')) {
        if (useAuthStore().loggedIn && useAuthStore().user?.user_type === 'chapter') {
            return;
        } else {
            return useRouter().push({
                path: '/auth/access',
                query: {
                    next: to.path
                }
            });
        }
    }
});
