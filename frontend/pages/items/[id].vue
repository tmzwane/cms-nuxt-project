<template>
  <div>
    <ItemDetails :item="item" />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "items",
});
const { id } = useRoute().params;

const item = {
  id: "123",
  locale: {
    title: "Test Title 1",
    description: "Test title one description",
  },
};
</script>
