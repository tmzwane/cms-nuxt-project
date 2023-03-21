<template>
  <div class="card text-center bg-blue-200 rounded-lg p-4">
    <Icon
      name="icon-park-outline:adjacent-item"
      class="text-5xl text-blue-400"
    />
    <p class="font-bold text-blue-500 truncate m-4">
      {{ item.locale.title }}
    </p>

    <p class="text-sm text-blue-400 truncate mt-2">
      {{ item.locale.summary }}.
    </p>
    <NuxtLink :to="`/items/${item._id}`">
      <p class="btn-item my-4">View Details</p>
    </NuxtLink>

    <div class="flex justify-center items-center">
      <Icon
        name="material-symbols:edit-square-outline-rounded"
        class="text-2xl text-blue-500 cursor-pointer mr-2 hover:text-blue-700"
        @click="router.push(`/items/update/${item._id}`)"
      />

      <Icon
        name="material-symbols:delete-forever"
        class="text-3xl text-red-500 cursor-pointer hover:text-red-700"
        @click="showConfirmation = true"
      />
    </div>

    <!-- Confirmation Modal -->
    <CommonConfirmationModal :show-confirmation="showConfirmation">
      <!-- Modal Header -->
      <template #header>
        <h3 class="text-2xl font-semibold">Delete Item?</h3>
      </template>
      <!-- Modal Body/Content -->
      <template #content>
        <p>Are you sure you want to delete this item?</p>
      </template>
      <!-- Modal Footer -->
      <template #footer>
        <button class="btn-outline" @click="showConfirmation = false">
          No
        </button>
        <button class="btn-delete ml-2" @click="deleteItem">Yes</button>
      </template>
    </CommonConfirmationModal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useItemStore } from "~/stores/ItemStore";

const router = useRouter();
const itemStore = useItemStore();
const { item } = defineProps(["item"]);

const showConfirmation = ref(false);

async function deleteItem() {
  await itemStore.deleteItem(item._id);
  showConfirmation.value = false;
  router.go();
}
</script>
