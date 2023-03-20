<template>
  <div>
    <div class="responsive-card-layout">
      <div v-for="i in allItems">
        <ItemCard :item="i" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useItemStore } from "~/stores/ItemStore";
const itemStore = useItemStore();

await itemStore.retrieveItems();

// Accessing getters and state
const { allItems } = storeToRefs(itemStore);
</script>
