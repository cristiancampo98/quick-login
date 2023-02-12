<template>
  <DisclosurePanel class="md:tw-hidden">
    <div class="tw-space-y-1 tw-px-2 tw-pt-2 tw-pb-3 sm:tw-px-3">
      <RouterLink
        v-for="(item, key) in getNavigation"
        :key="key"
        :to="item.href"
        :class="[
          'tw-text-gray-300 hover:tw-bg-gray-700 hover:tw-text-white',
          'tw-block tw-px-3 tw-py-2 tw-rounded-md tw-text-base tw-font-medium',
        ]"
        exact-active-class="tw-bg-gray-900 tw-text-white"
      >
        <DisclosureButton>{{ item.name }}</DisclosureButton>
      </RouterLink>
    </div>
    <div class="tw-border-t tw-border-gray-700 tw-pt-4 tw-pb-3">
      <div class="tw-flex tw-items-center tw-px-5">
        <div class="tw-flex-shrink-0">
          <img class="tw-h-10 tw-w-10 tw-rounded-full" :src="imageUrl" alt="" />
        </div>
        <div class="tw-ml-3">
          <div
            class="tw-text-base tw-font-medium tw-leading-none tw-text-white"
          >
            {{ userAuth.name }}
          </div>
          <div
            class="tw-text-sm tw-font-medium tw-leading-none tw-text-gray-400"
          >
            {{ userAuth.role === "admin" ? "Administrador" : "Coordinador" }}
          </div>
        </div>
        <button
          type="button"
          class="tw-ml-auto tw-flex-shrink-0 tw-rounded-full tw-bg-gray-800 tw-p-1 tw-text-gray-400 hover:tw-text-white focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-white focus:tw-ring-offset-2 focus:tw-ring-offset-gray-800"
        >
          <span class="tw-sr-only">View notifications</span>
          <BellIcon class="tw-h-6 tw-w-6" aria-hidden="true" />
        </button>
      </div>
      <div class="tw-mt-3 tw-space-y-1 tw-px-2">
        <DisclosureButton
          v-for="item in getUserNavigation"
          :key="item.name"
          as="a"
          :to="item.href"
          class="tw-block tw-rounded-md tw-px-3 tw-py-2 tw-text-base tw-font-medium tw-text-gray-400 hover:tw-bg-gray-700 hover:tw-text-white"
          >{{ item.name }}</DisclosureButton
        >
        <div
          class="tw-px-3 tw-py-2 tw-text-base tw-font-medium tw-text-gray-400 hover:tw-bg-gray-700"
          @click="logout"
        >
          Salir
        </div>
      </div>
    </div>
  </DisclosurePanel>
</template>
<script setup lang="ts">
import { DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { BellIcon } from "@heroicons/vue/24/outline";
import { computed } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useLogout } from "../../composables/logout";
import { useUserStore } from "../../stores/users";
const userStore = useUserStore();

const imageUrl =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

const userAuth = computed(() => {
  const user = userStore.someoneIsAuth;
  return user;
});

const getNavigation = computed(() => {
  return userStore.getNavigationByRol(userAuth.value.role);
});

const getUserNavigation = computed(() => {
  return userStore.getUserNavigation;
});

const notify = (message: string) => {
  toast(message, {
    autoClose: 2500,
  });
};

const logout = () => {
  if (useLogout()) {
    return notify("Cerrando sesión");
  }
};
</script>
