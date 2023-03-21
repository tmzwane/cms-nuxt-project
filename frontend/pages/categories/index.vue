<template>
  <div class="responsive-card-layout">
    <div v-for="i in allCategories">
      <CategoryCard :category="i" />
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useCategoryStore } from "~/stores/CategoryStore";
const categoryStore = useCategoryStore();

await categoryStore.retrieveCategories();

// Accessing getters and state
const { allCategories } = storeToRefs(categoryStore);

useHead({
  title: "Assessment | Categories",
  meta: [
    {
      name: "description",
      content: "View all assessment categories",
    },
  ],
});
</script>
