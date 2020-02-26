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
                v-model="data.nickName"
                class="ma-0 pa-0"
                label="please input your name"
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
export default {
  name: "MobileEditor",
  data() {
    return {
      dialog: false,
      valid: false,
      data: {
        nickName: ""
      },
      form: {
        nickName: {
          counter: 20,
          rules: [
            val => !!val || "请输入昵称",
            val =>
              (val && val.length <= this.form.nickName.counter) || "昵称过长"
          ]
        }
      }
    };
  },
  watch: {
    dialog(val) {
      if (val) {
        this.data.nickName = this.user.nickName;
      }
    }
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
      }
    },
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    async save() {
      if (this.$refs.form.validate()) {
        try {
          await this.$axios.patch("/s/user/nickname", this.data);
          this.user.nickName = this.data.nickName;
          this.show = false;
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
};
</script>
