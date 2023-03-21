<template>
  <div class="card">
    <div class="grid grid-cols-2 gap-2">
      <div class="p-7 text-center">
        <Icon name="jam:sitemap-f" class="text-9xl mx-auto my-7" />
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
        <button class="btn-delete font-bold" @click="showConfirmation = true">
          Delete
        </button>
      </div>
    </div>

    <!-- Confirmation Modal -->
    <CommonConfirmationModal
      :show-confirmation="showConfirmation"
      @cancelled="showConfirmation = false"
    >
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
        <button class="btn-delete ml-2" @click="deleteCategory">Yes</button>
      </template>
    </CommonConfirmationModal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useCategoryStore } from "~/stores/CategoryStore";

const router = useRouter();
const categoryStore = useCategoryStore();
const { category } = defineProps(["category"]);

const showConfirmation = ref(false);

async function deleteCategory() {
  await categoryStore.deleteCategory(category._id);
  showConfirmation.value = false;
  router.go(-1);
}
</script>
