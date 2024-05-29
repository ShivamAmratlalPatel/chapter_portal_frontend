import { defineStore } from 'pinia';
import type { RuntimeConfig } from 'nuxt/schema';
import { useAuthStorage } from '~/composables/auth';
import apiFetch from '~/composables/apiFetch';

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

            const config: RuntimeConfig = useRuntimeConfig();
            const resp: TokenResponse = await $fetch<TokenResponse>('token', {
                baseURL: config.public.apiUrl,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    grant_type: 'password',
                    client_id: config.public.clientId,
                    client_secret: config.public.clientSecret,
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
            try {
                await apiFetch('/users/me', {});
            } catch (error) {
                const router = useRouter();
                if (router.currentRoute.value.path === '/auth/login') {
                    return router.push({
                        path: '/auth/login'
                    });
                } else {
                    return router.push({
                        path: '/auth/login',
                        query: {
                            next: router.currentRoute.value.path
                        }
                    });
                }
            }
        },
        async register(full_name: string, username: string, email: string, password: string) {
            const runtimeConfig: RuntimeConfig = useRuntimeConfig();

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
            const runtimeConfig: RuntimeConfig = useRuntimeConfig();

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
        }
    }
});
