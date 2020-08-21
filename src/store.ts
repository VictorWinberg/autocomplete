import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    hideDropdown: true,
    search: "",
    items: [] as { url: string; date: number }[]
  },
  getters: {
    hasUrl: (state): ((url: string) => boolean) => (url: string): boolean => {
      return !!state.items.find((i): boolean => i.url === url);
    }
  },
  mutations: {
    initialiseStore(state): void {
      const localSearch = localStorage.getItem("search");
      const localItems = localStorage.getItem("items");

      if (localSearch) state.search = localSearch;
      if (localItems) state.items = JSON.parse(localItems);
    },
    updateSearch(state, search): void {
      state.search = search;
      localStorage.setItem("search", search);
    },
    addItem(state, item): void {
      state.items.push(item);
      localStorage.setItem("items", JSON.stringify(state.items));
    },
    removeItem(state, url): void {
      const findUrl = (item: { url: string }): boolean => item.url === url;
      const idx = state.items.findIndex(findUrl);
      state.items.splice(idx, 1);
      localStorage.setItem("items", JSON.stringify(state.items));
    },
    hideDropdown(state, hideDropdown): void {
      state.hideDropdown = hideDropdown;
    }
  },
  actions: {
    toggleItem({ commit, getters }, { resource, json }): void {
      if (getters.hasUrl(json.url)) {
        commit("removeItem", json.url);
      } else {
        const newItem = Object.entries(json).reduce((acc, [key, value]): {} => {
          if (["created", "edited"].includes(key)) return acc;
          if (typeof value !== "string") return acc;

          acc[key] = value;
          return acc;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }, {} as any);

        commit("addItem", { resource, ...newItem, date: Date.now() });
      }
    },
    removeItem({ commit, getters }, item): void {
      if (!getters.hasUrl(item.url)) return;
      commit("removeItem", item.url);
    }
  }
});
