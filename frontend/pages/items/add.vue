<template>
  <div class="flex flex-col justify-center items-center">
    <Icon
      name="icon-park-outline:adjacent-item"
      class="text-5xl text-blue-400"
    />
    <div class="pt-6 px-4 max-w-4xl">
      <!-- Title -->
      <div class="form-group mb-6">
        <label class="form-label" for="item-title"> Title </label>
        <input
          id="item-title"
          v-model="title"
          type="text"
          class="form-control form-fields"
          placeholder="Item title here..."
        />
      </div>

      <!-- Source -->
      <div class="form-group mb-6">
        <label class="form-label" for="item-url"> Source URL </label>
        <input
          id="item-url"
          v-model="src"
          type="text"
          class="form-control form-fields"
          placeholder="Item URL here..."
        />
      </div>

      <!-- Extension -->
      <div class="form-group mb-6">
        <label class="form-label" for="item-extension"> Extension </label>
        <input
          id="item-extension"
          v-model="extension"
          type="text"
          class="form-control form-fields"
          placeholder="Item extension here..."
        />
      </div>

      <!-- Creator -->
      <div class="form-group mb-6">
        <label class="form-label" for="item-creator"> Creator </label>
        <input
          id="item-creator"
          v-model="creator"
          type="text"
          class="form-control form-fields"
          placeholder="Item creator here..."
        />
      </div>

      <!-- Type -->
      <div class="">
        <div class="form-group mb-6">
          <label class="form-label" for="item-type"> Type </label>
          <select
            id="item-type"
            v-model="type"
            class="form-control form-fields"
          >
            <option value="" selected disabled>Choose Item Type</option>
            <option v-for="(item, idx) of itemTypes" :value="item" :key="idx">
              {{ item }}
            </option>
          </select>
        </div>
      </div>

      <!-- Quality -->
      <div class="">
        <div class="form-group mb-6">
          <label class="form-label" for="item-quality"> Quality </label>
          <select
            id="item-quality"
            v-model="quality"
            class="form-control form-fields"
          >
            <option value="" selected disabled>Choose Item Quality</option>
            <option
              v-for="(quality, idx) of itemQualities"
              :value="quality"
              :key="idx"
            >
              {{ quality }}
            </option>
          </select>
        </div>
      </div>

      <!-- Size -->
      <div class="form-group mb-6">
        <label class="form-label" for="item-size"> Size </label>
        <input
          id="item-size"
          v-model="size"
          type="text"
          class="form-control form-fields"
          placeholder="Item size here..."
        />
      </div>

      <!-- Size Unit -->
      <div class="">
        <div class="form-group mb-6">
          <label class="form-label" for="item-size-unit"> Size Unit </label>
          <select
            id="item-size-unit"
            v-model="sizeUnit"
            class="form-control form-fields"
          >
            <option value="" selected disabled>Choose Item Size Unit</option>
            <option
              v-for="(sizeUnit, idx) of sizeUnits"
              :value="sizeUnit"
              :key="idx"
            >
              {{ sizeUnit }}
            </option>
          </select>
        </div>
      </div>

      <!-- Category -->
      <div v-if="allCategories.length > 0" class="">
        <div class="form-group mb-6">
          <label class="form-label" for="item-category"> Categories </label>
          <select
            id="item-category"
            v-model="categories"
            class="form-control form-fields"
            multiple
          >
            <option value="" selected disabled>Choose Item Categories</option>
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
        <label class="form-label" for="item-description"> Description </label>
        <textarea
          id="item-description"
          v-model="description"
          rows="4"
          placeholder="Item description here..."
          class="form-control form-fields"
        ></textarea>
      </div>

      <!-- Summary: Shown when user doesn't want it auto-generated -->
      <div v-if="!autoSummary" class="form-group mb-6">
        <label class="form-label" for="item-summary"> Summary </label>
        <textarea
          id="item-summary"
          v-model="summary"
          rows="3"
          placeholder="Item summary here..."
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
        <label class="form-label" for="seo-title"> SEO Title </label>
        <input
          id="seo-title"
          v-model="seoTitle"
          type="text"
          class="form-control form-fields"
          placeholder="Item SEO title here..."
        />
      </div>

      <!-- SEO Description: Shown when user doesn't want it auto-generated -->
      <div class="form-group mb-6" v-if="!autoSEODescription">
        <label class="form-label" for="seo-description">
          SEO Description
        </label>
        <textarea
          id="seo-description"
          v-model="seoDescription"
          rows="4"
          placeholder="Item SEO description here..."
          class="form-control form-fields"
        ></textarea>
      </div>

      <!-- SEO Summary: Shown when user doesn't want it auto-generated -->
      <div class="form-group mb-6" v-if="!autoSEOSummary">
        <label class="form-label" for="seo-summary"> SEO Summary </label>
        <textarea
          id="seo-summary"
          v-model="seoSummary"
          rows="4"
          placeholder="Item SEO summary here..."
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
          @click.prevent="submitItemForm"
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
          <p>Item added successfully</p>
        </template>
        <!-- Modal Footer -->
        <template #footer>
          <button class="btn-outline" @click="router.push('/')">
            Go Home...
          </button>
          <button class="btn ml-2" @click="router.push('/items')">Done</button>
        </template>
      </CommonConfirmationModal>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useItemStore } from "~/stores/ItemStore";
import { useCategoryStore } from "~/stores/CategoryStore";
import { useUtilities } from "~/utils/utilities";

const router = useRouter();
const itemStore = useItemStore();
const categoryStore = useCategoryStore();
const { isEmpty, truncateWords } = useUtilities();

useHead({
  title: "Assessment | Add Item",
  meta: [
    {
      name: "description",
      content: "Add a new item",
    },
  ],
});

// Modal Controller
const showConfirmation = ref(false);

// Accessing store getters
const { itemTypes, itemQualities, sizeUnits } = storeToRefs(itemStore);
const { allCategories } = storeToRefs(categoryStore);

const title = ref("");
const src = ref("");
const extension = ref("");
const creator = ref("");
const type = ref("");
const quality = ref("");
const size = ref("");
const sizeUnit = ref("");
const categories = ref([]);
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

async function submitItemForm() {
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
    src: src.value,
    extension: extension.value,
    creator: creator.value,
    item_type: type.value,
    type: type.value,
    quality: quality.value,
    size: size.value,
    size_unit: sizeUnit.value,
    categories: categories.value,
    description: description.value,
    summary: summary.value,
    seo_title: seoTitle.value,
    seo_description: seoDescription.value,
    seo_summary: seoSummary.value,
    use_seo_values: useSEOValues.value,
  };

  await itemStore.createItem(payload);
  showConfirmation.value = true;
}
</script>
