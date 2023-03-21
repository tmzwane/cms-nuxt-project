<template>
  <div>
    <Head>
      <Title>Assessment | {{ category.locale.title }}</Title>
      <Meta name="description" :content="category.locale.summary" />
    </Head>
    <CategoryDetails :category="category" />
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useCategoryStore } from "~/stores/CategoryStore";
import { useUtilities } from "~/utils/utilities";

definePageMeta({
  layout: "categories",
});

const categoryStore = useCategoryStore();
const { isEmpty } = useUtilities();

// Accessing getters and state
const { allCategories } = storeToRefs(categoryStore);

const { id } = useRoute().params;

const category = allCategories.value.find((item) => {
  return item._id === id;
});

if (isEmpty(category)) {
  throw createError({
    statusCode: 400,
    statusMessage: `Could not find specified Category Id: ${id}`,
    fatal: true,
  });
}
</script>
