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
