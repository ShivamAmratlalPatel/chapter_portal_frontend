import { defineStore } from 'pinia';
import { RuntimeConfig } from '@nuxt/schema';
import { useAuthStore } from '~/stores/auth';

export const useMatrixMeetingsStore = defineStore({
    id: 'matrix_meetings',
    state: () => ({
        matrixMeetings: [] as any[]
    }),
    actions: {
        async fetchZoneMatrixMeeting(zone: string) {
            this.matrixMeetings = await apiFetch(`/matrix_meeting/zone/${zone}`, {});

            return this.matrixMeetings;
        },
        async saveMatrixMeeting(matrix_meeting_id: string, zone: string, meeting_date: string, agenda: string, minutes_link: string) {
            return await apiFetch(`/matrix_meeting/${matrix_meeting_id}`, {
                method: 'PUT',

                body: {
                    zone: zone,
                    meeting_date: meeting_date,
                    agenda: agenda,
                    minutes_link: minutes_link
                }
            });
        },
        async postMatrixMeeting(zone: string, meeting_date: string, agenda: string, minutes_link: string) {
            return await apiFetch(`/matrix_meeting`, {
                method: 'POST',

                body: {
                    zone,
                    meeting_date,
                    agenda,
                    minutes_link
                }
            });
        }
    }
});
