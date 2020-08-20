<template>
  <div class="container">
    <div class="autocomplete-container">
      <ul class="autocomplete-dropdown-menu" :class="hide && 'hide'">
        <li>
          <ul v-for="[key, resource] in Object.entries(resources)" :key="key">
            <li v-for="(json, idx) in results[key]" :key="idx">
              <autocomplete-card :resource="resource" :json="json" />
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";

import AutocompleteCard from "./AutocompleteCard.vue";

export default Vue.extend({
  name: "AutocompleteDropdown",
  components: { AutocompleteCard },
  data() {
    return {
      hide: true,
      resources: {
        films: "Film",
        people: "Person",
        planets: "Planet",
        species: "Species",
        starships: "Starship",
        vehicles: "Vehicle"
      },
      results: {}
    };
  },
  computed: mapState(["search"]),
  watch: {
    search(newSearch) {
      if (newSearch) {
        this.searchSWAPI(newSearch);
      } else {
        this.results = {};
      }
    }
  },
  created() {
    this.searchSWAPI(this.search);
    window.addEventListener("click", this.outerClick);
  },
  beforeDestroy() {
    window.removeEventListener("click", this.outerClick);
  },
  methods: {
    outerClick(event: Event) {
      const target = event.target as HTMLElement;
      if (target.closest(".autocomplete-container")) {
        document.body.classList.add("focus");
        this.hide = false;
      } else {
        document.body.classList.remove("focus");
        this.hide = true;
      }
    },
    async searchSWAPI(query: string) {
      if (!query) return;
      const keys = Object.keys(this.resources);
      const res = await Promise.all(
        keys.map(key => this.fetchSWAPI(key, query))
      );
      if (query !== this.search) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.results = keys.reduce(function(acc: any, key, i) {
        acc[key] = res[i];
        return acc;
      }, {});
    },
    async fetchSWAPI(resource: string, query: string): Promise<{}> {
      const res = await fetch(
        `https://swapi.dev/api/${resource}/?search=${query}`
      );
      const json = await res.json();
      return json.results;
    }
  }
});
</script>

<style lang="scss">
.autocomplete-dropdown-menu {
  position: absolute;
  overflow-y: scroll;
  max-height: 50vh;
  width: 100%;
  z-index: 1;

  &::-webkit-scrollbar {
    display: none;
  }

  &.hide {
    display: none;
  }
}

.focus .autocomplete-dropdown-menu {
  box-shadow: $box-shadow;
}
</style>
