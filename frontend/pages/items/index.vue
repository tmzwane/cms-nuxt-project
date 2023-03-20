<template>
  <div>
    <div class="grid grid-cols-4 gap-5">
      <div v-for="i in items">
        <ItemCard :item="i" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useItemStore } from "~/stores/ItemStore";
const itemStore = useItemStore();

// Accessing getters and state
const { items } = storeToRefs(itemStore);
</script>
