<template>
  <a
    class="autocomplete-card"
    href="#"
    :class="hasUrl(json.url) ? 'active' : ''"
    @click.prevent="() => toggleItem({ resource, json })"
  >
    <div class="absolute-bottom-right">
      <h1>{{ resource }}</h1>
    </div>
    <div v-for="(query, idx) in searchQueries" :key="idx">
      <b class="text-capitalize">{{ query.key }} </b>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <span v-html="query.value"></span>
    </div>
  </a>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions, mapGetters } from "vuex";

import { titleCase } from "@/utils";

const minAttr = 3;
const length = 15;

export default Vue.extend({
  name: "AutocompleteCard",
  props: {
    resource: { type: String, required: true },
    json: { type: Object, required: true }
  },
  computed: {
    ...mapState(["search"]),
    ...mapGetters(["hasUrl"]),
    searchQueries(): {}[] {
      return Object.entries(this.json)
        .filter(([, value]) => typeof value === "string")
        .map((entry, i) => {
          const [key, value] = entry as string[];
          const regMatch = value.match(new RegExp(this.search, "ig"));

          if (!regMatch && i >= minAttr) return;
          const { index = 0 } = regMatch || {};
          const startIndex = index - length > 0 ? index - length : 0;

          return {
            key: titleCase(key),
            value: value
              .substr(startIndex, length * 2)
              .replace(
                new RegExp(this.search, "ig"),
                match => `<span class="highlight">${match}</span>`
              )
          };
        })
        .filter(i => !!i) as {}[];
    }
  },
  methods: mapActions(["toggleItem"])
});
</script>

<style lang="scss">
.autocomplete-card {
  @include autocomplete-item;
  cursor: pointer;
  position: relative;
  background-color: $bg-color;
  border-top: none;

  &.active {
    background-color: $bg-focus-color;
  }

  &:focus,
  &:hover {
    background-color: lighten($bg-focus-color, 10%);
  }
}
</style>
