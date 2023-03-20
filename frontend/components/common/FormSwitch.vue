<template>
  <div class="w-full h-full flex flex-col">
    <div class="flex">
      <!-- Switch Container -->
      <div
        class="w-14 h-7 flex items-center rounded-full mx-3 px-1"
        :class="{ 'bg-blue-700': checked, 'bg-gray-300': !checked }"
        @click="onToggleSwitch"
      >
        <!-- Switch -->
        <div
          class="bg-white w-5 h-5 rounded-full shadow-md transform"
          :class="{ 'translate-x-7': checked }"
        ></div>
      </div>
      <span class="text-gray-400">
        {{ label }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { toRefs } from "vue";

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  checked: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: "cyan",
  },
});

const { label, checked } = toRefs(props);

const emit = defineEmits(["toggleSwitch"]);

const onToggleSwitch = (e) => {
  e.preventDefault();
  emit("toggleSwitch");
};
</script>
