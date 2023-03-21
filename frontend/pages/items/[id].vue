<template>
  <div>
    <Head>
      <Title>Assessment | {{ item.locale.title }}</Title>
      <Meta name="description" :content="item.locale.summary" />
    </Head>
    <ItemDetails :item="item" />
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useItemStore } from "~/stores/ItemStore";
import { useUtilities } from "~/utils/utilities";

definePageMeta({
  layout: "items",
});

const itemStore = useItemStore();
const { allItems } = storeToRefs(itemStore);
const { isEmpty } = useUtilities();

const { id } = useRoute().params;

const item = allItems.value.find((item) => {
  return item._id === id;
});

if (isEmpty(item)) {
  throw createError({
    statusCode: 400,
    statusMessage: `Could not find specified Item Id: ${id}`,
    fatal: true,
  });
}
</script>
