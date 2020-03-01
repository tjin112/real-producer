<template>
  <v-container fluid>
    <v-card class="pa-4 mx-auto" max-width="600">
      <v-subheader class="pa-0">主要联系方式：</v-subheader>
      <v-row no-gutters="">
        <v-col cols="12">
          <v-text-field
            label="Name:"
            clearable
            dense
            :rules="[rules.required]"
            maxlength="20"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field label="Email:" clearable dense :rules="[rules.email]"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field label="Phone:" clearable dense></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field label="Home:" clearable dense></v-text-field>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="pa-4 mx-auto mt-4" max-width="600">
      <v-subheader class="pa-0">others：</v-subheader>
      <v-row no-gutters="">
        <v-col cols="12">
          <v-text-field label="配偶电话:" dense></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field label="紧急联系人:" dense></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field label="工作地址:" dense></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field label="tag:" dense></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field label="Note:" dense></v-text-field>
        </v-col>
      </v-row>
    </v-card>
    <v-btn
      @click="addContact"
      class="mt-5 float-right mb-5"
      dark
      color="primary"
      >Add to Contact</v-btn
    >
  </v-container>
</template>
<script>
export default {
  name: "AddContact",
  title:'Add Contact',
  path: "/addContact",
  layout: "identity",
  data() {
    return {
      rules: {
        required: value => !!value || "Required.",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        }
      }
    };
  },
  methods: {
    addContact() {
      console.log("添加联系人");
    }
  }
};
</script>
