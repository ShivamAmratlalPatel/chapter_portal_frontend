import { defineStore } from 'pinia';
import { RuntimeConfig } from '@nuxt/schema';
import { useAuthStore } from '~/stores/auth';

export const useZonalTeamMeetingsStore = defineStore({
    id: 'zonal_team_meetings',
    state: () => ({
        zonalTeamMeetings: [] as any[]
    }),
    actions: {
        async fetchZonalTeamMeeting(zone: string) {
            this.zonalTeamMeetings = await apiFetch(`/zonal_team_meeting/zone/${zone}`, {});

            return this.zonalTeamMeetings;
        },
        async saveZonalTeamMeeting(zonal_team_meeting_id: string, zone: string, meeting_date: string, agenda: string, minutes_link: string) {
            return await apiFetch(`/zonal_team_meeting/${zonal_team_meeting_id}`, {
                method: 'PUT',

                body: {
                    zone: zone,
                    meeting_date: meeting_date,
                    agenda: agenda,
                    minutes_link: minutes_link
                }
            });
        },
        async postZonalTeamMeetings(zone: string, meeting_date: string, agenda: string, minutes_link: string) {
            return await apiFetch(`/zonal_team_meeting`, {
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
