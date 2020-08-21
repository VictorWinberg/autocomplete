<template>
  <div class="container">
    <div class="autocomplete-container">
      <ul class="autocomplete-dropdown-menu" :class="hideDropdown && 'hide'">
        <li v-for="({ resource, ...json }, idx) in items" :key="idx">
          <autocomplete-card
            :id="`ac-${idx}`"
            :resource="resource"
            :json="json"
          />
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
      selected: -1,
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
  computed: {
    ...mapState(["search", "hideDropdown"]),
    items(): {}[] {
      return Object.entries(this.resources).reduce((acc, [key, resource]) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let res = (this.results as any)[key] as {}[];
        if (!res) return acc;
        res = res.map(i => ({ ...i, resource }));
        return acc.concat(res);
      }, [] as {}[]);
    }
  },
  watch: {
    hideDropdown() {
      this.selected = -1;
    },
    search(newSearch) {
      if (newSearch) {
        this.searchSWAPI(newSearch);
      } else {
        this.results = {};
      }
      this.selected = -1;
    }
  },
  created() {
    this.searchSWAPI(this.search);
    document.addEventListener("keydown", this.handleKeydown, false);
  },
  beforeDestroy() {},
  methods: {
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
    },
    handleKeydown(event: KeyboardEvent) {
      if (!["ArrowUp", "ArrowDown", "Escape"].includes(event.code)) return;

      const [min, max] = [0, this.items.length - 1];
      event.preventDefault();

      if (event.code === "ArrowUp" && this.selected > min) {
        this.selected--;
      } else if (event.code === "ArrowDown" && this.selected < max) {
        this.selected++;
      } else if (event.code === "Escape") {
        document.body.click();
      }
      const el = document.getElementById(`ac-${this.selected}`);
      if (el) el.focus();
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
