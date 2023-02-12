<script setup lang="ts">
import { computed } from "vue";
import { useUserStore } from "../stores/users";
import TableComponent from "../components/TableComponent.vue";

const userStore = useUserStore();
const userAuth = computed(() => {
  const user = userStore.someoneIsAuth;
  return user;
});
</script>

<template>
 <div v-if="userAuth.role === 'admin'">
    <TableComponent />
  </div>
  <div
    v-else
    class="tw-rounded-lg tw-border-4 tw-border-dashed tw-border-gray-200"
  >
    <img src="/maintenance.png" alt="Mantenimiento" />
  </div>
</template>
