<template>
  <div class="container">
    <ul>
      <li v-for="item in items" :key="item.url" class="autocomplete-item">
        <a href="#" class="close" @click="() => removeItem(item)"></a>
        <div v-for="[key, value] in Object.entries(item)" :key="key">
          <div v-if="key === 'resource'" class="absolute-bottom-right">
            <h1>{{ value }}</h1>
          </div>
          <span v-else>
            <b>{{ titleCase(key) }}</b> {{ formatValue(key, value) }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions } from "vuex";
import dayjs from "dayjs";

import { titleCase } from "@/utils";

export default Vue.extend({
  name: "AutocompleteItems",
  computed: mapState(["items"]),
  methods: {
    ...mapActions(["removeItem"]),
    titleCase,
    formatValue(key: string, value: string | number) {
      if (key === "date") {
        return dayjs(value).format("MMMM D, YYYY h:mm A");
      }
      return value;
    }
  }
});
</script>

<style lang="scss">
.autocomplete-item {
  @include autocomplete-item;
  position: relative;
  border-bottom: none;
  background-color: lighten($bg-focus-color, 10%);
}

a.close {
  position: absolute;
  right: $spacer;
  cursor: pointer;
  height: 20px;
  width: 20px;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 13 13'><polyline class='arrow' fill='none' stroke='currentColor' points='1 1,6.5 6.5,12 1'/><polyline class='arrow' fill='none' stroke='currentColor' points='1 12,6.5 6.5,12 12'/></svg>");
}
</style>
