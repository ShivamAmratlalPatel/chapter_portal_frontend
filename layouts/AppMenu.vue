<script setup lang="ts">
import { ref } from 'vue';
import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Home',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/chapters' }]
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
                items: [
                    {
                        label: 'Applying to National Committee',
                        icon: 'pi pi-fw pi-file',
                        items: [
                            {
                                label: 'Team Profiles',
                                icon: 'pi pi-fw pi-file',
                                to: '/chapters/chapter-resource-centre/applying-to-national-committee/team-profiles'
                            }
                        ]
                    },
                    {
                        label: 'Chapter Admin',
                        icon: 'pi pi-fw pi-file',
                        items: [
                            {
                                label: 'AGM Guidance',
                                icon: 'pi pi-fw pi-file',
                                to: '/chapters/chapter-resource-centre/chapter-admin/agm-guidance'
                            },
                            {
                                label: 'Hindu Management System - Working effectively as a committee',
                                icon: 'pi pi-fw pi-file',
                                to: '/chapters/chapter-resource-centre/chapter-admin/hms-working-effectively-as-a-committee'
                            },
                            {
                                label: 'Initiating a Society',
                                icon: 'pi pi-fw pi-file',
                                to: '/chapters/chapter-resource-centre/chapter-admin/initiating-a-society'
                            },
                            {
                                label: 'Meet and Greet',
                                icon: 'pi pi-fw pi-file',
                                to: '/chapters/chapter-resource-centre/chapter-admin/meet-and-greet'
                            }
                        ]
                    },
                    {
                        label: 'Events Coordinators',
                        icon: 'pi pi-fw pi-file',
                        items: [
                            {
                                label: 'Event Ideas',
                                icon: 'pi pi-fw pi-file',
                                items: [
                                    {
                                        label: 'Bollywood film recommendations',
                                        icon: 'pi pi-fw pi-file',
                                        to: '/chapters/chapter-resource-centre/events-coordinators/event-ideas/bollywood-film-recommendations'
                                    }
                                ]
                            },
                            {
                                label: 'Ice Breakers',
                                icon: 'pi pi-fw pi-file',
                                items: [
                                    {
                                        label: 'Ice Breaker Ideas',
                                        icon: 'pi pi-fw pi-file',
                                        to: '/chapters/chapter-resource-centre/events-coordinators/ice-breakers/ice-breaker-ideas'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        label: 'General Secretaries',
                        icon: 'pi pi-fw pi-file',
                        items: [
                            {
                                label: 'A 101 Guide to being a secretary',
                                icon: 'pi pi-fw pi-file',
                                to: '/chapters/chapter-resource-centre/general-secretaries/a-101-guide-to-being-a-secretary'
                            },
                            {
                                label: 'Meeting Minutes Template',
                                icon: 'pi pi-fw pi-file',
                                to: '/chapters/chapter-resource-centre/general-secretaries/meeting-minutes-template'
                            },
                            {
                                label: 'Running Effective Meetings',
                                icon: 'pi pi-fw pi-file',
                                to: '/chapters/chapter-resource-centre/general-secretaries/running-effective-meetings'
                            },
                            {
                                label: 'Secretary Back to the Basics',
                                icon: 'pi pi-fw pi-file',
                                to: '/chapters/chapter-resource-centre/general-secretaries/secretary-back-to-the-basics'
                            }
                        ]
                    },
                    {
                        label: 'PR and Social Media Coordinators',
                        icon: 'pi pi-fw pi-file',
                        items: [
                            {
                                label: 'Communicating with External Organisations',
                                icon: 'pi pi-fw pi-file',
                                to: '/chapters/chapter-resource-centre/pr-and-social-media-coordinators/communicating-with-external-organisations'
                            },
                            {
                                label: 'Create the Perfect Social Media Post',
                                icon: 'pi pi-fw pi-file',
                                to: '/chapters/chapter-resource-centre/pr-and-social-media-coordinators/create-the-perfect-social-media-post'
                            },
                            {
                                label: 'Press Release Writing',
                                icon: 'pi pi-fw pi-file',
                                to: '/chapters/chapter-resource-centre/pr-and-social-media-coordinators/press-release-writing'
                            },
                            {
                                label: 'Public Relations 101',
                                icon: 'pi pi-fw pi-file',
                                to: '/chapters/chapter-resource-centre/pr-and-social-media-coordinators/public-relations-101'
                            }
                        ]
                    },
                    {
                        label: 'Sports Coordinators',
                        icon: 'pi pi-fw pi-file',
                        items: [
                            {
                                label: 'Sports Coordinators 101',
                                icon: 'pi pi-fw pi-file',
                                to: '/chapters/chapter-resource-centre/sports-coordinators/sports-coordinators-101'
                            }
                        ]
                    },
                    {
                        label: 'Treasurer',
                        icon: 'pi pi-fw pi-file',
                        items: [
                            {
                                label: 'Treasurer 101',
                                icon: 'pi pi-fw pi-file',
                                to: '/chapters/chapter-resource-centre/treasurer/treasurer-101'
                            },
                            {
                                label: 'Treasurer FAQs',
                                icon: 'pi pi-fw pi-file',
                                to: '/chapters/chapter-resource-centre/treasurer/treasurer-faqs'
                            },
                            {
                                label: 'Treasurer Handout',
                                icon: 'pi pi-fw pi-file',
                                to: '/chapters/chapter-resource-centre/treasurer/treasurer-handout'
                            }
                        ]
                    }
                ]
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
