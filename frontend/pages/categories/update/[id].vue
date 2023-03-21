<template>
  <div class="pt-6 px-4 max-w-4xl">
    <!-- Title -->
    <div class="form-group mb-6">
      <label class="form-label" for="category-title"> Title </label>
      <input
        id="category-title"
        v-model="title"
        type="text"
        class="form-control form-fields"
        placeholder="Category title here..."
      />
    </div>

    <!-- Path -->
    <div class="form-group mb-6">
      <label class="form-label" for="category-path"> Path </label>
      <input
        id="category-path"
        v-model="path"
        type="text"
        class="form-control form-fields"
        placeholder="Category path here..."
      />
    </div>

    <!-- Parent -->
    <div v-if="filteredCategories(allCategories).length > 0" class="">
      <div class="form-group mb-6">
        <select v-model="parentId" class="form-control form-fields">
          <option value="" selected disabled>Choose Parent Category</option>
          <option
            v-for="(category, idx) of filteredCategories(allCategories)"
            :value="category._id"
            :key="idx"
          >
            {{ category.locale.title }}
          </option>
        </select>
      </div>
    </div>

    <!-- Description -->
    <div class="form-group mb-6">
      <label class="form-label" for="category-description"> Description </label>
      <textarea
        id="category-description"
        v-model="description"
        rows="4"
        placeholder="Category description here..."
        class="form-control form-fields"
      ></textarea>
    </div>

    <!-- Summary -->
    <div class="form-group mb-6">
      <label class="form-label" for="category-summary"> Summary </label>
      <textarea
        id="category-summary"
        v-model="summary"
        rows="3"
        placeholder="Category summary here..."
        class="form-control form-fields"
      ></textarea>
    </div>

    <!-- SEO Title -->
    <div class="form-group mb-6">
      <label class="form-label" for="seo-title"> SEO Title </label>
      <input
        id="seo-title"
        v-model="seoTitle"
        type="text"
        class="form-control form-fields"
        placeholder="Category SEO title here..."
      />
    </div>

    <!-- SEO Description -->
    <div class="form-group mb-6">
      <label class="form-label" for="seo-description"> SEO Description </label>
      <textarea
        id="seo-description"
        v-model="seoDescription"
        rows="4"
        placeholder="Category SEO description here..."
        class="form-control form-fields"
      ></textarea>
    </div>

    <!-- SEO Description -->
    <div class="form-group mb-6">
      <label class="form-label" for="seo-summary"> SEO Summary </label>
      <textarea
        id="seo-summary"
        v-model="seoSummary"
        rows="4"
        placeholder="Category SEO summary here..."
        class="form-control form-fields"
      ></textarea>
    </div>

    <!-- Use SEO Values -->
    <div class="form-group mb-6 mx-auto">
      <CommonFormSwitch
        label="Use SEO"
        :checked="useSEOValues"
        @toggle-switch="useSEOValues = !useSEOValues"
      />
    </div>

    <!-- Form Buttons -->
    <div class="flex justify-end mx-auto">
      <button
        class="btn-update font-bold mr-2"
        @click.prevent="submitCategoryUpdateForm"
      >
        Update
      </button>
      <nuxt-link to="/categories" class="btn-delete font-bold">
        Cancel
      </nuxt-link>
    </div>

    <!-- Confirmation Modal -->
    <CommonConfirmationModal
      :show-confirmation="showConfirmation"
      @cancelled="showConfirmation = false"
    >
      <!-- Modal Header -->
      <template #header>
        <h3 class="text-2xl font-semibold">Category Updated</h3>
      </template>
      <!-- Modal Body/Content -->
      <template #content>
        <p>Update was successful, do you want to return back?</p>
      </template>
      <!-- Modal Footer -->
      <template #footer>
        <button class="btn-outline" @click="router.push('/')">
          Go Home...
        </button>
        <button class="btn ml-2" @click="router.go(-1)">Done</button>
      </template>
    </CommonConfirmationModal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useCategoryStore } from "~/stores/CategoryStore";
import { useUtilities } from "~/utils/utilities";

const router = useRouter();
const categoryStore = useCategoryStore();
const { isEmpty } = useUtilities();

useHead({
  title: "Assessment | Update Category",
  meta: [
    {
      name: "description",
      content: "Update category",
    },
  ],
});

// Modal Controller
const showConfirmation = ref(false);

// Accessing getters and state
const { allCategories } = storeToRefs(categoryStore);

const { id } = useRoute().params;

const activeCategory = allCategories.value.find((item) => {
  return item._id === id;
});

if (isEmpty(activeCategory)) {
  throw createError({
    statusCode: 400,
    statusMessage: `Could not find specified Category Id: ${id}`,
    fatal: true,
  });
}

let existingParentId;

if (!isEmpty(activeCategory.parent)) {
  existingParentId = activeCategory.parent._id;
} else {
  existingParentId = "";
}

const title = ref(activeCategory.locale.title);
const path = ref(activeCategory.path);
const parentId = ref(existingParentId);
const description = ref(activeCategory.locale.description);
const summary = ref(activeCategory.locale.summary);

const seoTitle = ref(activeCategory.locale.seo_title);
const seoDescription = ref(activeCategory.locale.seo_description);
const seoSummary = ref(activeCategory.locale.seo_summary);

const useSEOValues = ref(true);

async function submitCategoryUpdateForm() {
  const payload = {
    id,
    title: title.value,
    path: path.value,
    parent_id: parentId.value,
    description: description.value,
    summary: summary.value,
    seo_title: seoTitle.value,
    seo_description: seoDescription.value,
    seo_summary: seoSummary.value,
    use_seo_values: useSEOValues.value,
  };

  await categoryStore.updateCategory(payload);
  showConfirmation.value = true;
}

function filteredCategories(categories) {
  const filtered = categories.filter((cat) => {
    if (cat._id !== activeCategory._id) {
      return cat;
    }
  });

  return filtered;
}
</script>
