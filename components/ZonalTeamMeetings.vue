<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useChaptersStore } from '~/stores/chapters';
import { useZonalTeamMeetingsStore } from '~/stores/zonal_team_meetings';

async function fetchData() {
    // Fetch data from the server
    try {
        // Make the API call
        await useZonalTeamMeetingsStore().fetchZonalTeamMeeting(useRouter().currentRoute.value.params.zone);
    } catch (error) {
        // Handle the error
        console.error(error);
    }
}

async function chapterUpdates() {
    await fetchData();
}

onBeforeMount(() => {
    // Call fetchData when the component is about to be mounted
    fetchData();
});

import { ref } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import AddZonalTeamMeeting from '~/components/meetings/AddZonalTeamMeeting.vue';

const columns = ref([
    { field: 'meeting_date', header: 'Meeting Date' },
    { field: 'agenda', header: 'Agenda' },
    { field: 'minutes_link', header: 'Minutes Link' }
]);
const filters = ref({
    meeting_date: { value: null, matchMode: FilterMatchMode.CONTAINS },
    agenda: { value: null, matchMode: FilterMatchMode.CONTAINS },
    minutes_link: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

const toast = useToast();

async function onCellEditComplete(event) {
    try {
        await useZonalTeamMeetingsStore().saveZonalTeamMeeting(event.data.id, event.data.zone, event.data.meeting_date, event.data.agenda, event.data.minutes_link);
        toast.add({ severity: 'success', summary: 'Success', detail: 'Action updated successfully', life: 3000 });
    } catch {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Action update failed', life: 3000 });
    }

    let { data, newValue, field } = event;

    switch (field) {
        case 'quantity':
        case 'price':
            if (isPositiveInteger(newValue)) data[field] = newValue;
            else event.preventDefault();
            break;

        default:
            if (newValue.trim().length > 0) data[field] = newValue;
            else event.preventDefault();
            break;
    }
}

const isPositiveInteger = (val) => {
    let str = String(val);

    str = str.trim();

    if (!str) {
        return false;
    }

    str = str.replace(/^0+/, '') || '0';
    var n = Math.floor(Number(str));

    return n !== Infinity && String(n) === str && n >= 0;
};

onBeforeRouteUpdate((newRoute) => {
    useZonalTeamMeetingsStore().fetchZonalTeamMeeting(newRoute.params.zone);
});
</script>

<template>
    <Toast></Toast>

    <h2>Matrix Meetings</h2>

    <AddZonalTeamMeeting :zone="useRouter().currentRoute.value.params.zone" @updatesubmit="chapterUpdates()"></AddZonalTeamMeeting>

    <div class="card p-fluid">
        <DataTable
            v-model:filters="filters"
            :value="useZonalTeamMeetingsStore().zonalTeamMeetings"
            editMode="cell"
            @cell-edit-complete="onCellEditComplete"
            filterDisplay="row"
            :pt="{
                table: { style: 'min-width: 50rem' },
                column: {
                    bodycell: ({ state }) => ({
                        class: [{ 'pt-0 pb-0': state['d_editing'] }]
                    })
                }
            }"
        >
            <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header" style="width: 25%" sortable filter>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" v-tooltip.top.focus="'Hit enter key to filter'" type="text" @keydown.enter="filterCallback()" class="p-column-filter" />
                </template>
                <template #editor="{ data, field }">
                    <InputText v-model="data[field]" autofocus />
                </template>
            </Column>
        </DataTable>
    </div>
</template>
