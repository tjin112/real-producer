<template>
  <v-container fluid>
    <v-form v-model="valid" ref="form" class="mt-6" lazy-validation>
      <v-card class="pa-4 mx-auto" max-width="600">
        <v-subheader class="pa-0">主要联系方式：</v-subheader>
        <v-row no-gutters="">
          <v-col cols="12">
            <v-text-field
              v-model="info.firstName"
              label="First name"
              clearable
              dense
              :rules="[rules.required]"
              maxlength="20"
              prepend-icon="mdi-account"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="info.lastName"
              label="Last name"
              clearable
              dense
              :rules="[rules.required]"
              maxlength="20"
              prepend-icon="mdi-account"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="info.email"
              label="Email:"
              clearable
              dense
              :rules="[rules.email]"
              prepend-icon="mdi-email"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="info.telephone"
              label="Phone:"
              clearable
              dense
              prepend-icon="mdi-phone"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="info.familyTel"
              label="Home:"
              clearable
              dense
              prepend-icon="mdi-home"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card>
      <v-card class="pa-4 mx-auto mt-4" max-width="600">
        <v-subheader class="pa-0">others：</v-subheader>
        <v-row no-gutters="">
          <v-col cols="12">
            <v-text-field
              v-model="info.spouseTel"
              label="配偶电话:"
              dense
              prepend-icon="mdi-home-account"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="info.emergencyContact"
              label="紧急联系人:"
              dense
              prepend-icon="mdi-car-brake-alert"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="info.workAddress"
              label="工作地址:"
              dense
              prepend-icon="mdi-briefcase"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="info.tags"
              label="tag:"
              dense
              prepend-icon="mdi-tag-outline"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="info.note"
              label="Note:"
              dense
              prepend-icon="mdi-note"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card>
    </v-form>
    <v-btn
      class="white--text mt-6"
      color="primary"
      :disabled="!valid"
      block
      x-large
      @click="addContact"
      >Add to contact
    </v-btn>
  </v-container>
</template>
<script>
export default {
  name: "AddContact",
  title: "Add Contact",
  path: "/addContact",
  layout: "identity",
  data() {
    return {
      valid: false,
      info: {
        firstName: "",
        lastName: "",
        email: "",
        telephone: "",
        familyTel: "",
        spouseTel: "",
        emergencyContact: "",
        workAddress: "",
        tags: [""],
        note: "",
      },
      rules: {
        required: (value) => !!value || "Required.",
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
    };
  },
  methods: {
    async addContact() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.info.tags = this.info.tags.split(",");
        try {
          await this.$axios.post("/api/customers", this.info, {
            headers: {
              Authorization: sessionStorage.getItem("auth"),
            },
          });
        } catch (err) {
          console.error(err);
        }
      }
    },
  },
};
</script>
