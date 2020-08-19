<template>
  <form class="autocomplete" @submit="onSubmit">
    <input
      id="search"
      v-model="search"
      type="search"
      name="search"
      placeholder="search.."
      autocomplete="off"
      @input="onChange"
      @focus="inputFocus"
      @blur="inputBlur"
    />
    <button type="submit">Search</button>
  </form>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AutocompleteInput",
  data() {
    return {
      search: ""
    };
  },
  methods: {
    onSubmit(event: Event) {
      console.log("Submit", this.search);

      event.preventDefault();
    },
    onChange() {
      console.log("Change", this.search);
    },
    inputFocus() {
      document.body.classList.add("focus");
    },
    inputBlur() {
      document.body.classList.remove("focus");
    }
  }
});
</script>

<style lang="scss"></style>
