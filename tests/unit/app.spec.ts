import { shallowMount } from "@vue/test-utils";
import App from "@/App.vue";

describe("App.vue", (): void => {
  it("renders", (): void => {
    const wrapper = shallowMount(App);
    expect(wrapper.find("h1").text()).toMatch("Jayway - Autocomplete");
  });
});
