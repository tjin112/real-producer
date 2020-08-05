<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on }">
      <slot v-bind:on="on"></slot>
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{
          !!user.nickName ? "Edit your name" : "Change your name"
        }}</v-toolbar-title>
      </v-toolbar>
      <v-container fluid>
        <v-form v-model="valid" ref="form" class="mt-6" lazy-validation>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="data.firstName"
                class="ma-0 pa-0"
                label="please input your first name"
                :rules="form.nickName.rules"
                :counter="form.nickName.counter"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="data.lastName"
                class="ma-0 pa-0"
                label="please input your last name"
                :rules="form.nickName.rules"
                :counter="form.nickName.counter"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-btn
                class="white--text"
                color="primary"
                :disabled="!valid"
                block
                x-large
                @click="save"
                >Save
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
// import qs from "qs";
export default {
  name: "MobileEditor",
  data() {
    return {
      dialog: false,
      valid: false,
      data: {
        firstName: "",
        lastName: "",
      },
      form: {
        nickName: {
          counter: 20,
          rules: [(val) => !!val || "cannot be empty"],
        },
      },
    };
  },
  watch: {
    dialog(val) {
      if (val) {
        this.data.nickName = this.user.nickName;
      }
    },
  },
  computed: {
    show: {
      set(val) {
        this.dialog = val;
        if (!val) {
          this.$refs.form.reset();
        }
      },
      get() {
        return this.dialog;
      },
    },
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    async save() {
      if (this.$refs.form.validate()) {
        try {
          await this.$axios.put(
            "/api/accounts/firstname",
            {
              name: this.data.firstName,
            },
            {
              headers: {
                Authorization: this.$store.state.Identity.auth
                  ? this.$store.state.Identity.auth
                  : JSON.parse(localStorage.getItem("token")),
              },
            }
          );
          await this.$axios.put(
            "/api/accounts/lastname",
            {
              name: this.data.lastName,
            },
            {
              headers: {
                Authorization: this.$store.state.Identity.auth
                  ? this.$store.state.Identity.auth
                  : JSON.parse(localStorage.getItem("token")),
              },
            }
          );
          this.show = false;
          await this.$axios
            .get("/api/accounts/", {
              headers: {
                Authorization: this.$store.state.Identity.auth
                  ? this.$store.state.Identity.auth
                  : JSON.parse(localStorage.getItem("token")),
              },
            })
            .then((res) => {
              this.$store.commit("SET_USER", res.data);
            });
        } catch (err) {
          console.error(err);
        }
      }
    },
  },
};
</script>
