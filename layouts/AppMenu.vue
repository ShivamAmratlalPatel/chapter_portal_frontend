<script setup lang="ts">
import { ref } from 'vue';
import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Home',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
    },
    {
        label: 'Managing your Society',
        items: [
            {
                label: 'Finance',
                icon: 'pi pi-fw pi-money-bill',
                to: '/chapters/finance'
            },
            {
                label: 'Events',
                icon: 'pi pi-fw pi-sitemap',
                to: '/chapters/events'
            },
            {
                label: 'Social Media',
                icon: 'pi pi-fw pi-camera',
                to: '/chapters/social-media'
            }
        ]
    },
    {
        label: 'Resources',
        icon: 'pi pi-fw pi-folder',
        items: [
            {
                label: 'Chapter Resource Centre',
                icon: 'pi pi-fw pi-file',
                to: '/chapters/chapter-resource-centre'
            },
            {
                label: 'Portal Help',
                icon: 'pi pi-fw pi-external-link',
                to: '/chapters/portal-help'
            }
        ]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
