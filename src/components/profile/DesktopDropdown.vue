<template>
  <Menu as="div" class="tw-relative tw-ml-3">
    <div>
      <MenuButton
        class="tw-flex tw-max-w-xs tw-items-center tw-rounded-full tw-bg-gray-800 tw-text-sm focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-white focus:tw-ring-offset-2 focus:tw-ring-offset-gray-800"
      >
        <span class="tw-sr-only">Open user menu</span>
        <img class="tw-h-8 tw-w-8 tw-rounded-full" :src="imageUrl" alt="" />
      </MenuButton>
    </div>
    <transition
      enter-active-class="tw-transition tw-ease-out tw-duration-100"
      enter-from-class="tw-transform tw-opacity-0 tw-scale-95"
      enter-to-class="tw-transform tw-opacity-100 tw-scale-100"
      leave-active-class="tw-transition tw-ease-in tw-duration-75"
      leave-from-class="tw-transform tw-opacity-100 tw-scale-100"
      leave-to-class="tw-transform tw-opacity-0 tw-scale-95"
    >
      <MenuItems
        class="tw-absolute tw-right-0 tw-z-10 tw-mt-2 tw-w-48 tw-origin-top-right tw-rounded-md tw-bg-white tw-py-1 tw-shadow-lg tw-ring-1 tw-ring-black tw-ring-opacity-5 focus:tw-outline-none"
      >
        <div class="tw-px-4 tw-mt-2">
          <div
            class="tw-text-base tw-font-medium tw-leading-none tw-text-gray-500"
          >
            {{ userAuth.name }}
          </div>
          <div
            class="tw-text-sm tw-font-medium tw-leading-none tw-text-gray-400"
          >
            {{ userAuth.role === "admin" ? "Administrador" : "Coordinador" }}
          </div>
        </div>
        <MenuItem
          v-for="item in getUserNavigation"
          :key="item.name"
          v-slot="{ active }"
          class="tw-mt-2"
        >
          <a
            :href="item.href"
            :class="[
              active ? 'tw-bg-gray-100' : '',
              'tw-block tw-px-4 tw-py-2 tw-text-sm tw-text-gray-700',
            ]"
            >{{ item.name }}</a
          >
        </MenuItem>
        <div
          class="tw-px-4 tw-py-2 tw-text-sm hover:tw-bg-gray-100 tw-text-gray-700"
          @click="logout"
        >
          Salir
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
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
