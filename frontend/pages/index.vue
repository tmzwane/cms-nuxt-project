<template>
  <div>
    <!-- Home Control Layout -->
    <div class="home-control-layout">
      <!-- New Item Card/Button -->
      <nuxt-link to="/items/add">
        <div class="home-control-btn">
          <div class="home-control-btn-icon border-blue-100 bg-blue-50">
            <Icon name="fa-user-secret" class="text-2xl text-blue-400" />
          </div>

          <div class="ml-4">
            <h2 class="font-semibold">New Item</h2>
            <p class="mt-2 text-sm text-gray-500">Add a new item...</p>
          </div>
        </div>
      </nuxt-link>

      <nuxt-link to="/categories/add">
        <div class="home-control-btn">
          <div class="home-control-btn-icon border-orange-100 bg-orange-50">
            <Icon name="fa-user-secret" class="text-2xl text-orange-400" />
          </div>

          <div class="ml-4">
            <h2 class="font-semibold">New Category</h2>
            <p class="mt-2 text-sm text-gray-500">Add a new category...</p>
          </div>
        </div>
      </nuxt-link>
    </div>

    <!-- Recently Added Items  -->
    <div v-if="items.length > 0" class="mt-5">
      <h1 class="text-xl mb-2">Recently Added Items...</h1>
      <div class="grid grid-cols-4 gap-5">
        <div v-for="i in items">
          <ItemCard :item="i" />
        </div>
      </div>
    </div>

    <!-- Recently Added Categories  -->
    <div v-if="categories.length > 0" class="mt-5">
      <h1 class="text-xl mb-2">Recently Added Categories...</h1>
      <div class="grid grid-cols-4 gap-5">
        <div v-for="i in categories">
          <CategoryCard :category="i" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useItemStore } from "~/stores/ItemStore";
import { useCategoryStore } from "~/stores/CategoryStore";

const itemStore = useItemStore();
await itemStore.retrieveItems();

const categoryStore = useCategoryStore();
await categoryStore.retrieveCategories();

const { recentItems: items } = storeToRefs(itemStore);
const { recentCategories: categories } = storeToRefs(categoryStore);
</script>
