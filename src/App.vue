<template>
  <div id="app">
    <h1 class="text-center my-2">Jayway - Autocomplete</h1>
    <autocomplete-input />
    <autocomplete-dropdown />
    <div class="flex-grow"></div>
    <autocomplete-items />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations } from "vuex";
import AutocompleteInput from "@/components/AutocompleteInput.vue";
import AutocompleteDropdown from "@/components/AutocompleteDropdown.vue";
import AutocompleteItems from "@/components/AutocompleteItems.vue";

export default Vue.extend({
  name: "App",
  components: { AutocompleteInput, AutocompleteDropdown, AutocompleteItems },
  created() {
    window.addEventListener("click", this.handleFocus);
    document.addEventListener("keyup", this.handleFocus, false);
  },
  beforeDestroy() {
    window.removeEventListener("click", this.handleFocus);
    document.removeEventListener("keyup", this.handleFocus, false);
  },
  methods: {
    ...mapMutations(["hideDropdown"]),
    handleFocus(event: Event) {
      const target = event.target as HTMLElement;
      const inAutocomplete = !!target.closest(".autocomplete-container");
      if (inAutocomplete) {
        document.body.classList.add("focus");
      } else {
        document.body.classList.remove("focus");
      }
      this.hideDropdown(!inAutocomplete);
    }
  }
});
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .flex-grow {
    min-height: $spacer;
    flex-grow: 1;
  }
}
</style>
