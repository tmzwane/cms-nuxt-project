<template>
  <div v-if="showConfirmation">
    <div class="fixed flex justify-center items-center inset-0 z-50">
      <div class="flex flex-col max-w-5xl rounded-lg shadow-lg bg-white">
        <!-- Header -->
        <div class="p-5">
          <div class="flex justfiy-between items-start">
            <slot name="header"></slot>
            <button class="p-1 leading-none" @click="onCancel">
              <div class="text-xl font-semibold h-6 w-6">
                <span>x</span>
              </div>
            </button>
          </div>
        </div>
        <!-- Body -->
        <div class="p-6">
          <slot name="content"></slot>
        </div>
        <!-- Footer -->
        <div class="flex justify-end items-center p-6">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
    <div class="fixed bg-black opacity-25 inset-0 z-40"></div>
  </div>
</template>

<script setup>
import { toRefs } from "vue";

const props = defineProps({
  showConfirmation: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: "cyan",
  },
});

const { showConfirmation } = toRefs(props);

const emit = defineEmits(["cancelled", "confirmed"]);

const onCancel = (e) => {
  e.preventDefault();
  emit("cancelled");
};
</script>
