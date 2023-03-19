<template>
  <div class="card">
    <div class="grid grid-cols-2 gap-2">
      <div class="p-7 text-center">
        <font-awesome-icon
          icon="fa-solid fa-user-secret"
          class="mx-auto my-7 text-9xl"
        />
      </div>
      <div class="p-7">
        <h2 class="text-4xl my-7">{{ item.locale.title }}</h2>
        <h3 class="font-bold border-b-2 mb-4 pb-2">Item description:</h3>
        <p class="mb-7">{{ item.locale.description }}</p>
        <nuxt-link to="/items/update" class="btn font-bold mr-2">
          Update
        </nuxt-link>
        <nuxt-link to="/items/add" class="btn font-bold"> Delete </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup>
const { item } = defineProps(["item"]);
</script>
