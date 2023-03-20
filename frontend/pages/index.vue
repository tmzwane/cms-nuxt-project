<template>
  <div>
    <!-- Home Control Layout -->
    <div class="home-control-layout">
      <!-- New Item Card/Button -->
      <nuxt-link to="/items/add">
        <div class="home-control-btn bg-blue-50 hover:bg-blue-100">
          <div class="home-control-btn-icon border-blue-200 bg-blue-100">
            <Icon
              name="line-md:check-list-3-filled"
              class="text-3xl text-blue-400"
            />
          </div>

          <div class="ml-4">
            <h2 class="font-semibold text-blue-500">New Item</h2>
            <p class="mt-2 text-sm text-blue-400">Add a new item...</p>
          </div>
        </div>
      </nuxt-link>

      <!-- New Category Card/Button -->
      <nuxt-link to="/categories/add" class="border-orange-500">
        <div
          class="home-control-btn border-orange-500 bg-orange-50 hover:bg-orange-100"
        >
          <div class="home-control-btn-icon border-orange-200 bg-orange-100">
            <Icon
              name="line-md:clipboard-check-twotone"
              class="text-3xl text-orange-400"
            />
          </div>

          <div class="ml-4">
            <h2 class="font-semibold text-orange-500">New Category</h2>
            <p class="mt-2 text-sm text-orange-400">Add a new category...</p>
          </div>
        </div>
      </nuxt-link>
    </div>

    <!-- Recently Added Items  -->
    <div v-if="items.length > 0" class="mt-5">
      <h1 class="text-xl mb-2">Recently Added Items...</h1>
      <div class="responsive-card-layout">
        <div v-for="i in items">
          <ItemCard :item="i" />
        </div>
      </div>
    </div>

    <!-- Recently Added Categories  -->
    <div v-if="categories.length > 0" class="mt-5">
      <h1 class="text-xl mb-2">Recently Added Categories...</h1>
      <div class="responsive-card-layout">
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
