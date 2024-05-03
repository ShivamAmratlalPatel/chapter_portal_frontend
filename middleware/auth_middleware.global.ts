import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware((to, from) => {
    useAuthStore().check_logged_in();
    if (to.path.includes('internal')) {
        if (useAuthStore().loggedIn && useAuthStore().user?.user_type === 'admin') {
            useAuthStore().check_logged_in();
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
            useAuthStore().check_logged_in();
            return;
        } else {
            return useRouter().push({
                path: '/auth/access',
                query: {
                    next: to.path
                }
            });
        }
    } else if (to.path.includes('auth')) {
        useAuthStore().logout();
        return;
    } else if (to.path === '/') {
        useAuthStore().logout();
        return useRouter().push({
            path: '/auth/login'
        });
    } else {
        if (useAuthStore().loggedIn && useAuthStore().user?.user_type === 'chapter') {
            return useRouter().push({
                path: '/chapters'
            });
        } else if (useAuthStore().loggedIn && useAuthStore().user?.user_type === 'admin') {
            return useRouter().push({
                path: '/internal/health'
            });
        }
    }
});
