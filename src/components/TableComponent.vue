<template>
  <div class="tw-overflow-x-auto tw-w-full">
    <table class="tw-w-full tw-border">
      <thead>
        <tr>
          <th class="tw-text-left">Atleta</th>
          <th class="tw-text-center">Edad</th>
          <th class="tw-text-left">País</th>
          <th class="tw-text-center">Año</th>
          <th class="tw-text-left">Fecha</th>
          <th class="tw-text-left">Deporte</th>
          <th class="tw-text-center">Oro</th>
          <th class="tw-text-center">Plata</th>
          <th class="tw-text-center">Bronce</th>
          <th class="tw-text-center">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(person, index) in displayedData" :key="index">
          <td class="tw-text-left">{{ person.athlete }}</td>
          <td class="tw-text-center">{{ person.age }}</td>
          <td class="tw-text-left">{{ person.country }}</td>
          <td class="tw-text-center">{{ person.year }}</td>
          <td class="tw-text-left">{{ person.date }}</td>
          <td class="tw-text-left">{{ person.sport }}</td>
          <td class="tw-text-center">{{ person.gold }}</td>
          <td class="tw-text-center">{{ person.silver }}</td>
          <td class="tw-text-center">{{ person.bronze }}</td>
          <td class="tw-text-center">{{ person.total }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="tw-flex tw-justify-center tw-gap-x-10 tw-mt-4">
    <button
      class="hover:tw-underline tw-underline-offset-4"
      @click="previousPage"
    >
      Anterior
    </button>
    <span>Página {{ currentPage }} de {{ numberOfPages }}</span>
    <button class="hover:tw-underline tw-underline-offset-4" @click="nextPage">
      Siguiente
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type Winner from "../interfaces/Winner";
import { useOlympicWinnerStore } from "../stores/olympicWinners";

const olympicWinnersStore = useOlympicWinnerStore();

const data = ref<Array<Winner>>([]);
const displayedData = ref<Array<Winner>>([]);
const numberOfPages = ref();

onMounted(async () => {
  const result = await olympicWinnersStore.fetchData();
  data.value = result;
  displayedData.value = data.value.slice(0, itemsPerPage);
  numberOfPages.value = Math.ceil(data.value.length / itemsPerPage);
});

const itemsPerPage = 15;

let currentPage = 1;

const nextPage = () => {
  if (currentPage < numberOfPages.value) {
    currentPage++;
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    displayedData.value.splice(
      0,
      displayedData.value.length,
      ...data.value.slice(start, end)
    );
  }
};

const previousPage = () => {
  if (currentPage > 1) {
    currentPage--;
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    displayedData.value.splice(
      0,
      displayedData.value.length,
      ...data.value.slice(start, end)
    );
  }
};
</script>

<style scoped>
tr:hover {
  background-color: #f2f2f2;
  height: 30px;
}

</style>
