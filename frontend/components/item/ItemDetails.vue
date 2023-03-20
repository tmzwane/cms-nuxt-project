<template>
  <div class="card">
    <div class="grid grid-cols-2 gap-2">
      <div class="p-7 text-center">
        <Icon name="fa-user-secret" class="text-9xl mx-auto my-7" />
      </div>
      <div class="p-7">
        <h2 class="text-4xl my-7">{{ item.locale.title }}</h2>
        <h3 class="font-bold border-b-2 mb-4 pb-2">Item description:</h3>
        <p class="mb-7">{{ item.locale.description }}</p>
        <nuxt-link
          :to="`/items/update/${item._id}`"
          class="btn-update font-bold mr-2"
        >
          Update
        </nuxt-link>
        <button class="btn-delete font-bold">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const { item } = defineProps(["item"]);
</script>
