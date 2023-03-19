<template>
  <div>
    <p>Category Id: {{ id }}</p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem dolore
      dolores exercitationem suscipit enim ad optio dignissimos fugit quas
      blanditiis, porro magni maiores ipsa, corrupti, officia iure corporis
      animi dolor?
    </p>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "categories",
});

const { id } = useRoute().params;
</script>
