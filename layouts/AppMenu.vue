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
                                label: 'Event Templates',
                                icon: 'pi pi-fw pi-file',
                                items: [
                                    {
                                        label: 'Coach/Transport List Template',
                                        icon: 'pi pi-fw pi-file',
                                        to: '/chapters/chapter-resource-centre/events-coordinators/event-templates/coach-transport-list-template'
                                    },
                                    {
                                        label: 'Guest List Template',
                                        icon: 'pi pi-fw pi-file',
                                        to: '/chapters/chapter-resource-centre/events-coordinators/event-templates/guest-list-template'
                                    },
                                    {
                                        label: 'Procurement Template',
                                        icon: 'pi pi-fw pi-file',
                                        to: '/chapters/chapter-resource-centre/events-coordinators/event-templates/procurement-template'
                                    },
                                    {
                                        label: 'Timetable Template',
                                        icon: 'pi pi-fw pi-file',
                                        to: '/chapters/chapter-resource-centre/events-coordinators/event-templates/timetable-template'
                                    }
                                ]
                            },
                            {
                                label: 'Ice Breakers',
                                icon: 'pi pi-fw pi-file',
                                items: [
                                    {
                                        label: '40 free icebreakers',
                                        icon: 'pi pi-fw pi-file',
                                        to: '/chapters/chapter-resource-centre/events-coordinators/ice-breakers/40-free-icebreakers'
                                    },
                                    {
                                        label: 'Ice Breaker Ideas',
                                        icon: 'pi pi-fw pi-file',
                                        to: '/chapters/chapter-resource-centre/events-coordinators/ice-breakers/ice-breaker-ideas'
                                    }
                                ]
                            },
                            {
                                label: 'Event Summary',
                                icon: 'pi pi-fw pi-file',
                                to: '/chapters/chapter-resource-centre/events-coordinators/event-summary'
                            },
                            {
                                label: 'Post Event Evaluation Report',
                                icon: 'pi pi-fw pi-file',
                                to: '/chapters/chapter-resource-centre/events-coordinators/post-event-evaluation-report'
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
                                label: 'NHSF (UK) Logos',
                                icon: 'pi pi-fw pi-file',
                                to: '/chapters/chapter-resource-centre/pr-and-social-media-coordinators/nhsf-uk-logos'
                            },
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
                                label: 'How to Use Premiere Pro',
                                icon: 'pi pi-fw pi-file',
                                to: '/chapters/chapter-resource-centre/pr-and-social-media-coordinators/how-to-use-premiere-pro'
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
                        label: 'Sanskaar Coordinators',
                        icon: 'pi pi-fw pi-file',
                        items: [
                            {
                                label: 'Aarti Resources',
                                icon: 'pi pi-fw pi-file',
                                items: [
                                    {
                                        label: 'Lyric Booklets',
                                        icon: 'pi pi-fw pi-file',
                                        items: [
                                            {
                                                label: 'Hanuman Chalisa',
                                                icon: 'pi pi-fw pi-file',
                                                to: '/chapters/chapter-resource-centre/sanskaar-coordinators/aarti-resources/lyric-booklets/hanuman-chalisa'
                                            },
                                            {
                                                label: 'Jaya Aadhya Shakthi',
                                                icon: 'pi pi-fw pi-file',
                                                to: '/chapters/chapter-resource-centre/sanskaar-coordinators/aarti-resources/lyric-booklets/jaya-aadhya-shakthi'
                                            },
                                            {
                                                label: 'Om Jai Jagaadish Hare',
                                                icon: 'pi pi-fw pi-file',
                                                to: '/chapters/chapter-resource-centre/sanskaar-coordinators/aarti-resources/lyric-booklets/om-jai-jagaadish-hare'
                                            },
                                            {
                                                label: 'Bhajan Booklet',
                                                icon: 'pi pi-fw pi-file',
                                                to: '/chapters/chapter-resource-centre/sanskaar-coordinators/aarti-resources/lyric-booklets/bhajan-booklet'
                                            }
                                        ]
                                    },
                                    {
                                        label: 'Aarti and Kirtan Links',
                                        icon: 'pi pi-fw pi-file',
                                        to: '/chapters/chapter-resource-centre/sanskaar-coordinators/aarti-resources/aarti-and-kirtan-links'
                                    },
                                    {
                                        label: 'Elevate your Aarti',
                                        icon: 'pi pi-fw pi-file',
                                        to: '/chapters/chapter-resource-centre/sanskaar-coordinators/aarti-resources/elevate-your-aarti'
                                    },
                                    {
                                        label: 'Mandir on Campus - A Case Study',
                                        icon: 'pi pi-fw pi-file',
                                        to: '/chapters/chapter-resource-centre/sanskaar-coordinators/aarti-resources/mandir-on-campus-a-case-study'
                                    }
                                ]
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
