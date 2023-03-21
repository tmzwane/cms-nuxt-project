<template>
  <div class="card text-center bg-orange-200 rounded-lg p-4">
    <Icon name="jam:sitemap-f" class="text-5xl text-orange-400" />
    <p class="font-bold text-orange-500 truncate m-4">
      {{ category.locale.title }}
    </p>

    <p class="text-sm text-orange-400 truncate mt-2">
      {{ category.locale.summary }}.
    </p>
    <NuxtLink :to="`/categories/${category._id}`">
      <p class="btn-category my-4">View Details</p>
    </NuxtLink>

    <div class="flex justify-center items-center">
      <Icon
        name="material-symbols:edit-square-outline-rounded"
        class="text-2xl text-blue-500 cursor-pointer mr-2 hover:text-blue-700"
        @click="router.push(`/categories/update/${category._id}`)"
      />

      <Icon
        name="material-symbols:delete-forever"
        class="text-3xl text-red-500 cursor-pointer hover:text-red-700"
        @click="showConfirmation = true"
      />
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
  router.go();
}
</script>
