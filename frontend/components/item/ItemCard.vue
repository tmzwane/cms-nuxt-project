<template>
  <div class="card text-center bg-green-200 rounded-lg p-4">
    <Icon name="fa-user-secret" class="text-5xl" />
    <p class="font-bold text-gray-500 m-4 truncate">{{ item.locale.title }}</p>
    <NuxtLink :to="`/items/${item.id}`">
      <p class="btn my-4">View Details</p>
    </NuxtLink>
  </div>
</template>

<script setup>
const { item } = defineProps(["item"]);
</script>
