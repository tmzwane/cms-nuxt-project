<template>
  <div class="card">
    <div class="grid grid-cols-2 gap-2">
      <div class="p-7 text-center">
        <Icon name="fa-user-secret" class="text-9xl mx-auto my-7" />
      </div>
      <div class="p-7">
        <h2 class="text-4xl my-7">{{ category.locale.title }}</h2>
        <h3 class="font-bold border-b-2 mb-4 pb-2">Category description:</h3>
        <p class="mb-7">{{ category.locale.description }}</p>
        <nuxt-link
          :to="`/categories/update/${category._id}`"
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
const { category } = defineProps(["category"]);
</script>
