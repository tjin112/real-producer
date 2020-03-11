<template>
  <v-container fluid class="pa-0">
    <Listing />
  </v-container>
</template>

<script>
import Listing from "@/components/List/Listing";
export default {
  name: "List",
  title: "List",
  path: "/list",
  layout: "identity",
  components: {
    Listing
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style></style>
