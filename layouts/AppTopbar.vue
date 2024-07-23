<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, onBeforeMount } from 'vue';
import { useLayout } from './composables/layout';
import { useRouter } from 'vue-router';
import { useChaptersStore } from '~/stores/chapters';
import { useAuthStore } from '~/stores/auth';

const { layoutConfig, onMenuToggle } = useLayout();
const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);
const router = useRouter();

onMounted(() => {
    bindOutsideClickListener();
});
onBeforeUnmount(() => {
    unbindOutsideClickListener();
});

const logoUrl = computed(() => {
    if (useAuthStore().user?.chapter_id) {
        return `/layout/images/logos/${useAuthStore().user?.chapter_id}.jpg`;
    } else {
        return `/layout/images/${layoutConfig.darkTheme.value ? 'om-orange' : 'om-orange'}.png`;
    }
});
const op = ref(null);

const toggle = (event) => {
    op.value.toggle(event);
};
const onTopBarMenuButton = () => {
    topbarMenuActive.value = !topbarMenuActive.value;
    if (useAuthStore().loggedIn) {
        useAuthStore().logout();
    }
    router.push('/auth/login');
};

const onSettingsClick = () => {
    topbarMenuActive.value = false;
    router.push('/utilities/documentation');
};

const topbarMenuClasses = computed(() => {
    return {
        'layout-topbar-menu-mobile-active': topbarMenuActive.value
    };
});

const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                topbarMenuActive.value = false;
            }
        };

        document.addEventListener('click', outsideClickListener.value);
    }
};

const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener);
        outsideClickListener.value = null;
    }
};

const isOutsideClicked = (event) => {
    if (!topbarMenuActive.value) return;
    const sidebarEl = document.querySelector('.layout-topbar-menu');
    const topbarEl = document.querySelector('.layout-topbar-menu-button');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};

async function fetchData(chapter_id: string | null = null) {
    if (chapter_id) {
        try {
            // Make the API call
            await useChaptersStore().fetchChapter(chapter_id);
        } catch (error) {
            // Handle any errors here
            console.error('fetchData');
            console.error(error);
        }
    }
}

onBeforeMount(() => {
    // Call fetchData when the component is about to be mounted
    if (useAuthStore().user?.chapter_id) {
        fetchData(useAuthStore().user.chapter_id);
    }
});
</script>

<template>
    <div class="layout-topbar">
        <router-link v-if="useAuthStore().user?.chapter_id && useChaptersStore().chapter?.name" :to="'/chapters/' + useChaptersStore().chapter?.id" class="layout-topbar-logo">
            <img :src="logoUrl" alt="logo" />
            <span v-if="useAuthStore().user?.chapter_id && useChaptersStore().chapter?.name"> {{ useChaptersStore().chapter.name }} Portal </span>
        </router-link>
        <router-link v-else-if="useAuthStore().loggedIn" to="/internal" class="layout-topbar-logo">
            <img :src="logoUrl" alt="logo" />
            <span>NatCom Portal</span>
        </router-link>
        <router-link v-else to="/chapters/chapter-resource-centre" class="layout-topbar-logo">
            <img :src="logoUrl" alt="logo" />
            <span>Chapter Resource Centre</span>
        </router-link>

        <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
            <i class="pi pi-bars"></i>
        </button>

        <button class="p-link layout-topbar-menu-button layout-topbar-button" @click="onTopBarMenuButton()">
            <i class="pi pi-ellipsis-v"></i>
        </button>

        <div class="layout-topbar-menu" :class="topbarMenuClasses">
            <div>
                <button @click="toggle" class="p-link layout-topbar-button">
                    <i class="pi pi-user"></i>
                    <span>Profile</span>
                </button>
                <OverlayPanel ref="op" appendTo="body" :showCloseIcon="true">
                    <div class="ml-auto">
                        <button @click="onTopBarMenuButton" class="p-link">
                            <i class="pi pi-sign-out"></i>
                            <span>Logout</span>
                        </button>
                    </div>
                </OverlayPanel>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
