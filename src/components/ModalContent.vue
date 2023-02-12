<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="tw-relative tw-z-10">
      <TransitionChild
        as="template"
        enter="tw-duration-300 tw-ease-out"
        enter-from="tw-opacity-0"
        enter-to="tw-opacity-100"
        leave="tw-duration-200 tw-ease-in"
        leave-from="tw-opacity-100"
        leave-to="tw-opacity-0"
      >
        <div class="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-25" />
      </TransitionChild>

      <div class="tw-fixed tw-inset-0 tw-overflow-y-auto">
        <div
          class="tw-flex tw-min-h-full tw-items-center tw-justify-center tw-p-4 tw-text-center"
        >
          <TransitionChild
            as="template"
            enter="tw-duration-300 tw-ease-out"
            enter-from="tw-opacity-0 tw-scale-95"
            enter-to="tw-opacity-100 tw-scale-100"
            leave="tw-duration-200 tw-ease-in"
            leave-from="tw-opacity-100 tw-scale-100"
            leave-to="tw-opacity-0 tw-scale-95"
          >
            <DialogPanel
              class="tw-w-full tw-max-w-md tw-transform tw-overflow-hidden tw-rounded-2xl tw-bg-white tw-p-6 tw-text-left tw-align-middle tw-shadow-xl tw-transition-all"
            >
              <DialogTitle
                as="h3"
                class="tw-text-lg tw-font-medium tw-leading-6 tw-text-gray-900"
              >
                Información de categoría
              </DialogTitle>
              <div class="tw-mt-2">
                <p class="tw-text-sm tw-text-gray-500">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae
                  cum cupiditate aperiam, autem at quos architecto explicabo nam
                  hic velit blanditiis facilis mollitia, exercitationem tempore
                  provident maiores magnam tempora eligendi.
                </p>
              </div>

              <div class="tw-mt-4">
                <button
                  type="button"
                  class="tw-inline-flex tw-justify-center tw-rounded-md tw-border tw-border-transparent tw-bg-blue-100 tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-blue-900 hover:tw-bg-blue-200 focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-blue-500 focus-visible:tw-ring-offset-2"
                  @click="closeModal"
                >
                  Cerrar
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits(["closeModal"]);

const isOpen = computed(() => {
  return props.isOpen;
});

function closeModal() {
  emit("closeModal");
}
</script>
