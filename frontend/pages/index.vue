<template>
  <div class="flex flex-col">
    <div
      class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <nuxt-link to="/items/add">
        <div class="flex items-start rounded-xl bg-white p-4 shadow-lg">
          <div
            class="flex h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-blue-50"
          >
            <font-awesome-icon
              icon="fa-solid fa-user-secret"
              class="text-xl text-blue-400"
            />
          </div>

          <div class="ml-4">
            <h2 class="font-semibold">New Item</h2>
            <p class="mt-2 text-sm text-gray-500">Add a new item...</p>
          </div>
        </div>
      </nuxt-link>

      <nuxt-link to="/categories/add">
        <div class="flex items-start rounded-xl bg-white p-4 shadow-lg">
          <div
            class="flex h-12 w-12 items-center justify-center rounded-full border border-orange-100 bg-orange-50"
          >
            <font-awesome-icon
              icon="fa-solid fa-user-secret"
              class="text-xl text-orange-400"
            />
          </div>

          <div class="ml-4">
            <h2 class="font-semibold">New Category</h2>
            <p class="mt-2 text-sm text-gray-500">Add a new category...</p>
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script setup>
const items = [
  {
    id: "123",
    locale: {
      title: "Test Title 1",
      description: "Test title one description",
    },
  },
];
</script>
