import { shallowMount } from "@vue/test-utils";
import App from "@/App.vue";
import AutocompleteInput from "@/components/AutocompleteInput.vue";
import AutocompleteDropdown from "@/components/AutocompleteDropdown.vue";
import AutocompleteItems from "@/components/AutocompleteItems.vue";

describe("App.vue", (): void => {
  it("renders", (): void => {
    const wrapper = shallowMount(App);
    expect(wrapper.find("h1").text()).toMatch("Autocomplete");
    expect(wrapper.contains(AutocompleteInput)).toBeTruthy();
    expect(wrapper.contains(AutocompleteDropdown)).toBeTruthy();
    expect(wrapper.contains(AutocompleteItems)).toBeTruthy();
  });
});
