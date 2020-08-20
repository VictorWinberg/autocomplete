<template>
  <div class="container">
    <form
      class="autocomplete-container autocomplete-form clearfix"
      @submit="onSubmit"
    >
      <input
        id="search"
        v-model="search"
        type="search"
        name="search"
        placeholder="search.."
        autocomplete="off"
        @input="onChange"
      />
      <button type="submit">Search</button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations } from "vuex";

export default Vue.extend({
  name: "AutocompleteInput",
  data() {
    return {
      search: this.$store.state.search
    };
  },
  methods: {
    ...mapMutations(["updateSearch"]),
    onSubmit(event: Event) {
      this.updateSearch(this.search);
      event.preventDefault();
    },
    onChange() {
      this.updateSearch(this.search);
    }
  }
});
</script>

<style lang="scss">
.autocomplete-form {
  input[type="search"] {
    @include autocomplete-item;
    float: left;
    width: 60%;
    outline: none;

    &::-webkit-search-cancel-button {
      -webkit-appearance: none;
      cursor: pointer;
      height: 20px;
      width: 20px;
      background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 13 13'><polyline class='arrow' fill='none' stroke='currentColor' points='1 1,6.5 6.5,12 1'/><polyline class='arrow' fill='none' stroke='currentColor' points='1 12,6.5 6.5,12 12'/></svg>");
    }
  }

  button[type="submit"] {
    @include autocomplete-item;
    cursor: pointer;
    float: right;
    width: 40%;
    border-left: none;
    text-transform: uppercase;
    transition: 0.1s background-color linear, 0.1s color linear;

    &:hover {
      color: $bg-color;
      background: $text-color;
    }
  }
}

.focus .autocomplete-form {
  input[type="search"],
  button[type="submit"] {
    box-shadow: $box-shadow;
  }
}

@include media-breakpoint-up(xs) {
  .autocomplete-form {
    input[type="search"] {
      width: 80%;
    }
    button[type="submit"] {
      width: 20%;
    }
  }
}
</style>
