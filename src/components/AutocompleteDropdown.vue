<template>
  <div>
    {{ results }}
  </div>
</template>

<script lang="ts">
import Vue from "vue";

interface Data {
  results: {
    films: {}[];
    // people: {}[];
    // planets: {}[];
    // species: {}[];
    // starships: {}[];
    // vehicles: {}[];
  };
}

export default Vue.extend({
  name: "AutocompleteDropdown",
  data() {
    return {
      results: {
        films: [],
        people: [],
        planets: [],
        species: [],
        starships: [],
        vehicles: []
      }
    };
  },
  created() {
    this.search("a");
  },
  methods: {
    async search(query: string) {
      const keys = Object.keys(this.results);
      const res = await Promise.all(
        keys.map(key => this.fetchSWAPI(key, query))
      );
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

<style lang="scss"></style>
