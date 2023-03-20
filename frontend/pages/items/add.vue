<template>
  <div class="pt-6 px-4 max-w-4xl">
    <!-- Title -->
    <div class="form-group mb-6">
      <input
        v-model="title"
        type="text"
        class="form-control form-fields"
        placeholder="Item title here..."
      />
    </div>

    <!-- Source -->
    <div class="form-group mb-6">
      <input
        v-model="src"
        type="text"
        class="form-control form-fields"
        placeholder="Item URL here..."
      />
    </div>

    <!-- Extension -->
    <div class="form-group mb-6">
      <input
        v-model="extension"
        type="text"
        class="form-control form-fields"
        placeholder="Item extension here..."
      />
    </div>

    <!-- Creator -->
    <div class="form-group mb-6">
      <input
        v-model="creator"
        type="text"
        class="form-control form-fields"
        placeholder="Item creator here..."
      />
    </div>

    <!-- Type -->
    <div class="">
      <div class="form-group mb-6">
        <select v-model="type" class="form-control form-fields">
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
        <select v-model="quality" class="form-control form-fields">
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
      <input
        v-model="size"
        type="text"
        class="form-control form-fields"
        placeholder="Item size here..."
      />
    </div>

    <!-- Size Unit -->
    <div class="">
      <div class="form-group mb-6">
        <select v-model="sizeUnit" class="form-control form-fields">
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
        <select v-model="categories" class="form-control form-fields" multiple>
          <option value="" selected disabled>Choose Item Category</option>
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
        placeholder="Item description here..."
        class="form-control form-fields"
      ></textarea>
    </div>

    <!-- Summary: Shown when user doesn't want it auto-generated -->
    <div v-if="!autoSummary" class="form-group mb-6">
      <textarea
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
      <input
        v-model="seoTitle"
        type="text"
        class="form-control form-fields"
        placeholder="Item SEO title here..."
      />
    </div>

    <!-- SEO Description: Shown when user doesn't want it auto-generated -->
    <div class="form-group mb-6" v-if="!autoSEODescription">
      <textarea
        v-model="seoDescription"
        rows="4"
        placeholder="Item SEO description here..."
        class="form-control form-fields"
      ></textarea>
    </div>

    <!-- SEO Description: Shown when user doesn't want it auto-generated -->
    <div class="form-group mb-6" v-if="!autoSEOSummary">
      <textarea
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
      <button class="btn-create font-bold mr-2" @click.prevent="submitItemForm">
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
import { useItemStore } from "~/stores/ItemStore";
import { useCategoryStore } from "~/stores/CategoryStore";
import { useUtilities } from "~/utils/utilities";

const itemStore = useItemStore();
const categoryStore = useCategoryStore();
const { isEmpty, truncateWords } = useUtilities();

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

function submitItemForm() {
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

  itemStore.createItem(payload);
}
</script>
