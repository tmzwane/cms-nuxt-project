<template>
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
        <select id="item-type" v-model="type" class="form-control form-fields">
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

    <!-- Summary -->
    <div class="form-group mb-6">
      <label class="form-label" for="item-summary"> Summary </label>
      <textarea
        id="item-summary"
        v-model="summary"
        rows="3"
        placeholder="Item summary here..."
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
        placeholder="Item SEO title here..."
      />
    </div>

    <!-- SEO Description -->
    <div class="form-group mb-6">
      <label class="form-label" for="seo-description"> SEO Description </label>
      <textarea
        id="seo-description"
        v-model="seoDescription"
        rows="4"
        placeholder="Item SEO description here..."
        class="form-control form-fields"
      ></textarea>
    </div>

    <!-- SEO Summary -->
    <div class="form-group mb-6">
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
        @click.prevent="submitUpdateItemForm"
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
import { useItemStore } from "~/stores/ItemStore";
import { useCategoryStore } from "~/stores/CategoryStore";
import { useUtilities } from "~/utils/utilities";

const router = useRouter();
const itemStore = useItemStore();
const categoryStore = useCategoryStore();
const { isEmpty } = useUtilities();

useHead({
  title: "Assessment | Update Item",
  meta: [
    {
      name: "description",
      content: "Update item",
    },
  ],
});

// Modal Controller
const showConfirmation = ref(false);

// Accessing store getters
const { allItems, itemTypes, itemQualities, sizeUnits } =
  storeToRefs(itemStore);
const { allCategories } = storeToRefs(categoryStore);

const { id } = useRoute().params;

const activeItem = allItems.value.find((item) => {
  return item._id === id;
});

if (isEmpty(activeItem)) {
  throw createError({
    statusCode: 400,
    statusMessage: `Could not find specified Item Id: ${id}`,
    fatal: true,
  });
}

const title = ref(activeItem.locale.title);
const src = ref(activeItem.media.src);
const extension = ref(activeItem.content.extension);
const creator = ref(activeItem.creator);
const type = ref(activeItem.item_type);
const quality = ref(activeItem.content.quality);
const size = ref(activeItem.content.size);
const sizeUnit = ref(activeItem.content.size_unit);
const categories = ref(
  activeItem.categories.filter((cat) => {
    return cat.locale.title;
  })
);
const description = ref(activeItem.locale.description);
const summary = ref(activeItem.locale.summary);

const seoTitle = ref(activeItem.locale.seo_title);
const seoDescription = ref(activeItem.locale.seo_description);
const seoSummary = ref(activeItem.locale.seo_summary);

const useSEOValues = ref(activeItem.locale.use_seo_values);

async function submitUpdateItemForm() {
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

  await itemStore.updateItem(payload);
  showConfirmation.value = true;
}
</script>
