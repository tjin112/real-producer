<template>
  <component v-bind:is="layout"></component>
</template>

<script>
import DefaultLayout from "./layouts/DefaultLayout";
import IdentityLayout from "./layouts/IdentityLayout";
import NoneLayout from "./layouts/NoneLayout";

export default {
  name: "App",
  // eslint-disable-next-line vue/no-unused-components
  components: { DefaultLayout, IdentityLayout, NoneLayout },
  computed: {
    layout() {
      return `${this.$route.meta.layout || "default"}-layout`;
    }
  }
};
</script>
