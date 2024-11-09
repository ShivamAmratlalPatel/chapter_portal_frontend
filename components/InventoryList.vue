<script setup>
import { ref, onMounted } from 'vue';
import { CustomerService } from '@/service/CustomerService';
import { useInventoryStore } from '~/stores/inventory';

onMounted(() => {
    loading.value = true;

    lazyParams.value = {
        first: 0,
        rows: 10,
        sortField: null,
        sortOrder: null,
        filters: filters.value
    };

    loadLazyData();
});

const dt = ref();
const loading = ref(false);
const totalRecords = ref(0);
const customers = ref();
const selectedCustomers = ref();
const selectAll = ref(false);
const first = ref(0);
const filters = ref({
    name: { value: '', matchMode: 'contains' }
});
const lazyParams = ref({});
const columns = ref([{ field: 'name', header: 'Name' }]);

const loadLazyData = (event) => {
    loading.value = true;
    lazyParams.value = { ...lazyParams.value, first: event?.first || first.value };

    setTimeout(() => {
        useInventoryStore()
            .fetchInventoryPagination(event?.filters, event?.sortField, event?.sortOrder, event?.rows, event?.page)
            .then((data) => {
                customers.value = data.customers;
                totalRecords.value = data.totalRecords;
                loading.value = false;
            });
    }, Math.random() * 1000 + 250);
};
const onPage = (event) => {
    lazyParams.value = event;
    loadLazyData(event);
};
const onSort = (event) => {
    lazyParams.value = event;
    loadLazyData(event);
};
const onFilter = (event) => {
    lazyParams.value.filters = filters.value;
    loadLazyData(event);
};
const onSelectAllChange = (event) => {
    selectAll.value = event.checked;

    if (selectAll.value) {
        CustomerService.getCustomers().then((data) => {
            selectAll.value = true;
            selectedCustomers.value = data.customers;
        });
    } else {
        selectAll.value = false;
        selectedCustomers.value = [];
    }
};
const onRowSelect = () => {
    selectAll.value = selectedCustomers.value.length === totalRecords.value;
};
const onRowUnselect = () => {
    selectAll.value = false;
};
</script>

<template>
    <div class="card p-fluid">
        <DataTable
            :value="customers"
            lazy
            paginator
            :first="first"
            :rows="10"
            v-model:filters="filters"
            ref="dt"
            dataKey="id"
            :totalRecords="totalRecords"
            :loading="loading"
            @page="onPage($event)"
            @sort="onSort($event)"
            @filter="onFilter($event)"
            filterDisplay="row"
            :globalFilterFields="['name', 'id']"
            v-model:selection="selectedCustomers"
            :selectAll="selectAll"
            @select-all-change="onSelectAllChange"
            @row-select="onRowSelect"
            @row-unselect="onRowUnselect"
            tableStyle="min-width: 75rem"
        >
            <Column field="name" header="Item" filterMatchMode="startsWith" sortable>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText type="text" v-model="filterModel.value" @keydown.enter="filterCallback()" class="p-column-filter" placeholder="Search" />
                </template>
            </Column>
            <Column field="quantity" header="Quantity"> </Column>
            <Column field="category.name" header="Category"></Column>
            <Column field="location.name" header="Location"></Column>
        </DataTable>
    </div>
</template>
