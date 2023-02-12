<template>
  <section>
    <div
      class="tw-grid tw-grid-rows-3 tw-space-y-10 md:tw-grid-cols-3 md:tw-space-y-0 tw-place-items-center"
    >
      <div
        v-for="(category, key) in getTotalMedals"
        :key="key"
        @click.capture="openModal"
        class="tw-shadow-md tw-px-10 tw-py-8 tw-rounded-lg tw-border tw-border-gray-100"
      >
        <img class="tw-w-24" :src="getUrlCup(key)" alt="Icon" />
        <h1 class="tw-text-center tw-font-semibold tw-text-xl">
          {{ category }}
        </h1>
      </div>
    </div>
  </section>
  <ModalComponent :isOpen="isOpen" @closeModal="closeModal" />
</template>
<script setup lang="ts">
import { computed, ref } from "vue";

import ModalComponent from "../components/ModalContent.vue";
import type Winner from "@/interfaces/Winner";
import { useOlympicWinnerStore } from "../stores/olympicWinners";
const olympicWinners = useOlympicWinnerStore();

const isOpen = ref(false);

const getTotalMedals = computed(() => {
  return calculateTotalMedals(olympicWinners.getWinners);
});
type TotalMedals = {
  gold: number;
  silver: number;
  bronze: number;
};

const calculateTotalMedals = (athletes: Winner[]): TotalMedals => {
  return athletes.reduce(
    (total, athlete) => {
      total.gold += athlete.gold;
      total.silver += athlete.silver;
      total.bronze += athlete.bronze;
      return total;
    },
    { gold: 0, silver: 0, bronze: 0 }
  );
};

const getUrlCup = (category: keyof TotalMedals): string => {
  const categories = {
    gold: "/gold-cup.png",
    silver: "silver-cup.png",
    bronze: "bronze-cup.png",
  };
  return categories[category];
};

const closeModal = () => {
  isOpen.value = false;
};

const openModal = () => {
  isOpen.value = true;
}
</script>
