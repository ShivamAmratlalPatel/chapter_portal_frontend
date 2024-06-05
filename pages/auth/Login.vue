<script setup lang="ts">
import { useLayout } from '@/layouts/composables/layout';
import { computed, ref } from 'vue';
import AppConfig from '@/layouts/AppConfig.vue';
import { useAuthStore } from '~/stores/auth';

const { layoutConfig } = useLayout();
const email = ref('');
const password = ref('');
// const checked = ref(false);
const logoUrl = computed(() => {
    return `/layout/images/${layoutConfig.darkTheme.value ? 'om-orange' : 'om-orange'}.png`;
});

definePageMeta({
    layout: false
});

const auth_store = useAuthStore();

const toast = useToast();

async function onLogInSubmit() {
    try {
        await auth_store.login(email.value, password.value);
        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Logged in successfully',
            life: 3000
        });

        if (useRoute().query?.next) {
            useRouter().push((useRoute().query as any).next);
        } else {
            if (useAuthStore().user?.user_type === 'chapter') {
                if (useAuthStore().user?.chapter_id) {
                    useRouter().push('/chapters');
                } else {
                    useRouter().push('/auth/error');
                }
            } else if (useAuthStore().user?.user_type === 'admin') {
                useRouter().push('/internal');
            } else {
                useRouter().push('/auth/error');
            }
        }
    } catch {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Invalid email or password',
            life: 3000
        });
    }
}
</script>

<template>
    <Toast></Toast>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <img :src="logoUrl" alt="Logos" class="mb-5 w-6rem flex-shrink-0" />
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <!--                        <img src="/demo/images/login/avatar.png" alt="Image" height="50" class="mb-3" />-->
                        <div class="text-900 text-3xl font-medium mb-3">Welcome!</div>
                        <span class="text-600 font-medium">Sign in to continue</span>
                    </div>

                    <div>
                        <label for="email1" class="block text-900 text-xl font-medium mb-2">Email</label>
                        <InputText id="email1" v-model="email" type="text" placeholder="Email address" class="w-full md:w-30rem mb-5" style="padding: 1rem" />

                        <label for="password1" class="block text-900 text-xl font-medium mb-2">Password</label>
                        <Password id="password1" v-model="password" :feedback="false" placeholder="Password" :toggleMask="true" class="w-full md:w-30rem mb-5" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>

                        <!--                        <div class="flex align-items-center justify-content-between mb-5 gap-5">-->
                        <!--                            <div class="flex align-items-center">-->
                        <!--                                <Checkbox id="rememberme1" v-model="checked" binary class="mr-2"></Checkbox>-->
                        <!--                                <label for="rememberme1">Remember me</label>-->
                        <!--                            </div>-->
                        <!--                            <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(&#45;&#45;primary-color)">Forgot password?</a>-->
                        <!--                        </div>-->
                        <Button label="Sign In" class="w-full p-3 text-xl" @click="onLogInSubmit"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <AppConfig simple />
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
