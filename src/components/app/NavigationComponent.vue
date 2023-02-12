<template>
  <div class="tw-hidden md:tw-block">
    <div class="tw-ml-10 tw-flex tw-items-baseline tw-space-x-4">
      <RouterLink
        v-for="item in getNavigation"
        :key="item.name"
        :to="item.href"
        :class="[
          item.current
            ? 'tw-bg-gray-900 tw-text-white'
            : 'tw-text-gray-300 hover:tw-bg-gray-700 hover:tw-text-white',
          'tw-px-3 tw-py-2 tw-rounded-md tw-text-sm tw-font-medium',
        ]"
        :aria-current="item.current ? 'page' : undefined"
      >
        {{ item.name }}
      </RouterLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useUserStore } from "../../stores/users";
const userStore = useUserStore();
const userAuth = computed(() => {
  const user = userStore.someoneIsAuth;
  return user;
});

const getNavigation = computed(() => {
  return userStore.getNavigationByRol(userAuth.value.role);
});
</script>
