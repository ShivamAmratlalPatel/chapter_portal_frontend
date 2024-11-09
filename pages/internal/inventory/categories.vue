<script setup lang="ts">
import CategoryList from '~/components/CategoryList.vue';
import { ref } from 'vue';

definePageMeta({
    layout: 'health'
});

const categoryList = ref(null);

const categoryAdd = () => {
    categoryList.value.loadLazyData();
};
</script>

<template>
    <div>
        <h1>Categories</h1>
        <p>Enter categories here</p>
    </div>
    <AddCategory @updatesubmit="categoryAdd()"></AddCategory>

    <div class="card">
        <CategoryList ref="categoryList"></CategoryList>
    </div>
</template>
