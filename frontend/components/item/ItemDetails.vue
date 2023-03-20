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
        <button class="btn-delete font-bold" @click="showConfirmation = true">
          Delete
        </button>
      </div>
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
        <button class="btn-outline" @click="router.to('/')">No</button>
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
}
</script>
