<script setup lang="ts">
definePageMeta({
    layout: 'health'
});
</script>

<template>
    <div>
        <h1>Inventory</h1>
        <p>Find items here</p>
    </div>
    <div class="card">
        <InventoryList></InventoryList>
    </div>
</template>
