<script setup lang="ts">
import { useLayout } from '@/layouts/composables/layout';
import { computed, ref } from 'vue';
import AppConfig from '@/layouts/AppConfig.vue';
import { useAuthStore } from '~/stores/auth';

const { layoutConfig } = useLayout();
const email = ref('');
const name = ref('');
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

async function onRegisterSubmit() {
    try {
        await auth_store.register(name.value, name.value, email.value, password.value);
        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Registered successfully',
            life: 3000
        });

        await useRouter().push('/auth/login');
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
                        <span class="text-600 font-medium">Register</span>
                    </div>

                    <div>
                        <label for="email1" class="block text-900 text-xl font-medium mb-2">Email</label>
                        <InputText id="email1" v-model="email" type="text" placeholder="Email address" class="w-full md:w-30rem mb-5" style="padding: 1rem" />

                        <label for="name" class="block text-900 text-xl font-medium mb-2">Full Name</label>
                        <InputText id="name" v-model="name" type="text" placeholder="Full Name" class="w-full md:w-30rem mb-5" style="padding: 1rem" />

                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
                        <Password id="password1" v-model="password" placeholder="Password" :toggleMask="true" class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>

                        <Button label="Sign In" class="w-full p-3 text-xl" @click="onRegisterSubmit"></Button>
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
