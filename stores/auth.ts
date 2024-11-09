import { defineStore } from 'pinia';
import type { RuntimeConfig } from 'nuxt/schema';
import { useAuthStorage } from '~/composables/auth';

export interface AuthUser {
    exp: number;
    sub: string;
    user_type: string;
    chapter_id: string | null;
}

export interface AuthState {
    loggedIn: boolean;
    user: AuthUser | null;
    loading: boolean;
    token: string | null;
}

interface TokenResponse {
    access_token: string;
    token_type: any;
}

function jwt_decode(access_token: string) {
    const base64Url = access_token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
    );

    return JSON.parse(jsonPayload);
}

export const useAuthStore = defineStore({
    id: 'auth',
    state: (): AuthState => {
        const { token, user } = useAuthStorage();

        return {
            loggedIn: !!token.value,
            user: user.value,
            loading: false,
            token: token.value
        };
    },
    actions: {
        async login(email: string, password: string) {
            const { store } = useAuthStorage();

            const runtimeConfig = useNuxtApp().$config;
            const resp: TokenResponse = await $fetch<TokenResponse>('token', {
                baseURL: runtimeConfig.public.apiUrl,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    grant_type: 'password',
                    client_id: runtimeConfig.public.clientId,
                    client_secret: runtimeConfig.public.clientSecret,
                    username: email,
                    password: password,
                    scope: ''
                })
            });

            // decode JWT token to get user data
            const user: any = await jwt_decode(resp.access_token);

            store(resp.access_token, user);

            this.user = user;
            this.token = resp.access_token;
            this.loggedIn = true;
        },
        logout() {
            const { clear } = useAuthStorage();
            clear();

            this.loggedIn = false;
            this.user = null;
            this.token = null;
        },
        async check_logged_in() {
            if (this.loggedIn) {
                if (this.user.exp > Date.now() / 1000) {
                    return;
                }
            }

            this.logout();
            // const runtimeConfig: RuntimeConfig = useNuxtApp().$config;
            //
            // try {
            //     await $fetch('/users/me', {
            //         baseURL: runtimeConfig.public.apiUrl,
            //         headers: {
            //             Authorization: `Bearer ${this.token}`
            //         }
            //     });
            //     console.log('User is logged in');
            // } catch (error) {
            //     try {
            //         const router = useRouter();
            //
            //         if (router.currentRoute.value.path === '/auth/login') {
            //             return router.push({
            //                 path: '/auth/login'
            //             });
            //         } else {
            //             return router.push({
            //                 path: '/auth/login',
            //                 query: {
            //                     next: router.currentRoute.value.path
            //                 }
            //             });
            //         }
            //     } catch (error) {
            //         console.error('Error redirecting to login:', error);
            //     }
            // }
        },
        async register(full_name: string, username: string, email: string, password: string) {
            const runtimeConfig: RuntimeConfig = useNuxtApp().$config;

            await $fetch('/users', {
                baseURL: runtimeConfig.public.apiUrl,
                method: 'POST',
                body: {
                    username,
                    full_name,
                    email,
                    password
                }
            });
        },
        async chapterRegister(full_name: string, username: string, email: string, password: string, chapter_id: string) {
            const runtimeConfig: RuntimeConfig = useNuxtApp().$config;

            const resp = await $fetch('/users/chapter', {
                baseURL: runtimeConfig.public.apiUrl,
                method: 'POST',
                body: {
                    username,
                    full_name,
                    email,
                    password,
                    chapter_id
                }
            });

            return resp;
        },
        async changePassword(user_id: string, new_password: string) {
            const runtimeConfig: RuntimeConfig = useNuxtApp().$config;

            await $fetch(`/users/${user_id}/change_password`, {
                baseURL: runtimeConfig.public.apiUrl,
                method: 'PUT',
                query: {
                    password: new_password
                }
            });
        }
    }
});
