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

    <!-- Summary: Shown when user doesn't want it auto-generated -->
    <div v-if="!autoSummary" class="form-group mb-6">
      <textarea
        v-model="summary"
        rows="3"
        placeholder="Category summary here..."
        class="form-control form-fields"
      ></textarea>
    </div>

    <!-- Auto-generate Flags -->
    <div class="grid grid-cols-4 gap-4 mb-6">
      <!-- Summary Flag -->
      <CommonFormSwitch
        label="Auto Summary"
        :checked="autoSummary"
        @toggle-switch="autoSummary = !autoSummary"
      />
      <!-- SEO Title Flag -->
      <CommonFormSwitch
        label="Auto SEO Title"
        :checked="autoSEOTitle"
        @toggle-switch="autoSEOTitle = !autoSEOTitle"
      />
      <!-- SEO Description Flag -->
      <CommonFormSwitch
        label="Auto SEO Description"
        :checked="autoSEODescription"
        @toggle-switch="autoSEODescription = !autoSEODescription"
      />
      <!-- SEO Summary Flag -->
      <CommonFormSwitch
        label="Auto SEO Summary"
        :checked="autoSEOSummary"
        @toggle-switch="autoSEOSummary = !autoSEOSummary"
      />
    </div>

    <!-- SEO Title: Shown when user doesn't want it auto-generated -->
    <div v-if="!autoSEOTitle" class="form-group mb-6">
      <input
        v-model="seoTitle"
        type="text"
        class="form-control form-fields"
        placeholder="Category SEO title here..."
      />
    </div>

    <!-- SEO Description: Shown when user doesn't want it auto-generated -->
    <div class="form-group mb-6" v-if="!autoSEODescription">
      <textarea
        v-model="seoDescription"
        rows="4"
        placeholder="Category SEO description here..."
        class="form-control form-fields"
      ></textarea>
    </div>

    <!-- SEO Description: Shown when user doesn't want it auto-generated -->
    <div class="form-group mb-6" v-if="!autoSEOSummary">
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
    <div class="flex justify-end mx-auto">
      <button
        class="btn-create font-bold mr-2"
        @click.prevent="submitCategoryForm"
      >
        Submit
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
        <h3 class="text-2xl font-semibold">Action Successful</h3>
      </template>
      <!-- Modal Body/Content -->
      <template #content>
        <p>Category added successfully</p>
      </template>
      <!-- Modal Footer -->
      <template #footer>
        <button class="btn-outline" @click="router.push('/')">
          Go Home...
        </button>
        <button class="btn ml-2" @click="router.push('/categories')">
          Done
        </button>
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
const { isEmpty, truncateWords } = useUtilities();

// Modal Controller
const showConfirmation = ref(false);

// Accessing getters and state
const { allCategories, loading } = storeToRefs(categoryStore);

const title = ref("");
const path = ref("");
const parentId = ref("");
const description = ref("");
const summary = ref("");

const autoSummary = ref(true);
const autoSEOTitle = ref(true);
const autoSEODescription = ref(true);
const autoSEOSummary = ref(true);

const seoTitle = ref("");
const seoDescription = ref("");
const seoSummary = ref("");

const useSEOValues = ref(true);

async function submitCategoryForm() {
  if (autoSummary.value && isEmpty(summary.value)) {
    // Limit summary to default 20 words
    summary.value = truncateWords(description.value);
  }

  if (autoSEOTitle.value && isEmpty(seoTitle.value)) {
    seoTitle.value = title.value;
  }

  if (autoSEODescription.value && isEmpty(seoDescription.value)) {
    // Limit SEO Description to 50 words
    seoDescription.value = truncateWords(description.value, 50);
  }

  if (autoSEOSummary.value && isEmpty(seoSummary.value)) {
    // Use whatever is available in summary
    seoSummary.value = summary.value;
  }

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

  await categoryStore.createCategory(payload);
  showConfirmation.value = true;
}
</script>
