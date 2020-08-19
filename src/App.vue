<template>
  <div id="app">
    <div class="container">
      <h1 class="text-center">Jayway - Autocomplete</h1>
      <autocomplete-input />
      <autocomplete-dropdown />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AutocompleteInput from "@/components/AutocompleteInput.vue";
import AutocompleteDropdown from "@/components/AutocompleteDropdown.vue";

export default Vue.extend({
  name: "App",
  components: { AutocompleteInput, AutocompleteDropdown }
});
</script>

<style lang="scss"></style>
