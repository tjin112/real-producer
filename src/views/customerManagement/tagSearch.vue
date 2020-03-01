<template>
  <v-container fluid class="pa-4">
    <v-combobox
      v-model="chips"
      :items="items"
      chips
      label="Your favorite hobbies"
      multiple
      solo
    >
      <template v-slot:selection="{ attrs, item, select, selected }">
        <v-chip
          v-bind="attrs"
          :input-value="selected"
          close
          @click="select"
          @click:close="remove(item)"
        >
          <strong>{{ item }}</strong>
        </v-chip>
      </template>
    </v-combobox>
    <v-card class="pl-2 pr-2">
      <v-row>
        <v-col cols="8">
          <v-icon color="primary">mdi-account</v-icon>
          <span class="ml-2">Taimin Jin</span>
          <v-divider class="mt-2 mb-2"></v-divider>
          <v-icon color="red">mdi-email</v-icon
          ><span class="ml-2">940986798@qq.com</span>
        </v-col>
        <v-col cols="4">
          <v-chip v-for="(item, index) in chips" :key="index" class="mb-1 mr-1" small>
            {{ item }}
          </v-chip>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "TagSearch",
  title: "Tag Search",
  path: "/tagsearch",
  layout: "identity",

  data() {
    return {
      chips: ["Buyer", "Seller", "has interests", "none"],
      items: ["tag1", "tag2"]
    };
  },
  watch: {
    chips: {
      handler: function() {
        console.log(this.chips);
      },
      deep: true
    }
  },
  mounted() {
    this.select();
  },
  methods: {
    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1);
      this.chips = [...this.chips];
    },
    select() {
      console.log("123");
    }
  }
};
</script>

<style></style>
