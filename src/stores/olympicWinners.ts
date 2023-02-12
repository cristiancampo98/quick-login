import { defineStore } from "pinia";
import type Winner from "../interfaces/Winner";

interface State {
  winners: Winner[];
}

export const useOlympicWinnerStore = defineStore("olympicWinner", {
  state: (): State => {
    return {
      winners: [],
    };
  },
  getters: {
    getWinners: (state) => state.winners,
  },
  actions: {
    async fetchData(): Promise<Winner[]> {
      try {
        if (this.winners.length) {
          return this.winners;
        }
        const response = await fetch(
          "https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinners.json"
        );
        this.winners = await response.json();
        return this.winners;
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  },
});