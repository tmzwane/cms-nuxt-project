<template>
  <div class="pt-6 px-4 max-w-4xl">
    <!-- Title -->
    <div class="form-group mb-6">
      <input
        v-model="title"
        type="text"
        class="form-control form-fields"
        placeholder="Category title here..."
      />
    </div>

    <!-- Path -->
    <div class="form-group mb-6">
      <input
        v-model="path"
        type="text"
        class="form-control form-fields"
        placeholder="Category path here..."
      />
    </div>

    <!-- Parent -->
    <div v-if="allCategories.length > 0" class="">
      <div class="form-group mb-6">
        <select v-model="parentId" class="form-control form-fields">
          <option value="" selected disabled>Choose Parent Category</option>
          <option
            v-for="(category, idx) of allCategories"
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
      <textarea
        v-model="description"
        rows="4"
        placeholder="Category description here..."
        class="form-control form-fields"
      ></textarea>
    </div>

    <!-- Summary -->
    <div class="form-group mb-6">
      <textarea
        v-model="summary"
        rows="3"
        placeholder="Category summary here..."
        class="form-control form-fields"
      ></textarea>
    </div>

    <!-- SEO Title -->
    <div class="form-group mb-6">
      <input
        v-model="seoTitle"
        type="text"
        class="form-control form-fields"
        placeholder="Category SEO title here..."
      />
    </div>

    <!-- SEO Description -->
    <div class="form-group mb-6">
      <textarea
        v-model="seoDescription"
        rows="4"
        placeholder="Category SEO description here..."
        class="form-control form-fields"
      ></textarea>
    </div>

    <!-- SEO Description -->
    <div class="form-group mb-6">
      <textarea
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
    <div class="lex justify-end mx-auto">
      <button
        class="btn-create font-bold mr-2"
        @click.prevent="submitCategoryUpdateForm"
      >
        Submit
      </button>
      <nuxt-link to="/categories" class="btn-delete font-bold">
        Cancel
      </nuxt-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useCategoryStore } from "~/stores/CategoryStore";
import { useUtilities } from "~/utils/utilities";

const categoryStore = useCategoryStore();
const { isEmpty } = useUtilities();

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

const title = ref(activeCategory.locale.title);
const path = ref(activeCategory.path);
const parentId = ref(activeCategory.parent._id);
const description = ref(activeCategory.locale.description);
const summary = ref(activeCategory.locale.summary);

const seoTitle = ref(activeCategory.locale.seo_title);
const seoDescription = ref(activeCategory.locale.seo_description);
const seoSummary = ref(activeCategory.locale.seo_summary);

const useSEOValues = ref(true);

function submitCategoryUpdateForm() {
  const payload = {
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

  categoryStore.updateCategory(payload);
}
</script>
