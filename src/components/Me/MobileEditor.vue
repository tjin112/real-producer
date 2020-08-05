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
          !!user.telephone ? "解绑手机" : "绑定手机"
        }}</v-toolbar-title>
      </v-toolbar>
      <v-container fluid>
        <v-form v-model="valid" ref="form" class="mt-6" lazy-validation>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="data.telephone"
                class="ma-0 pa-0"
                label="请输入手机号"
                :rules="form.mobile.rules"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-btn
                class="white--text"
                color="primary"
                :disabled="!valid"
                block
                x-large
                @click="bind"
                >绑定手机号
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
      canResend: true,
      isSending: false,
      captchaText: "获取验证码",
      data: {
        telephone: "",
        captcha: "1234",
      },
      form: {
        mobile: {
          rules: [
            (val) => !!val || "请输入手机号",
            // val => (val && /^1[3-9]\d{9}$/.test(val)) || "请输入正确手机号"
          ],
        },
      },
    };
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
    async bind() {
      this.isSending = false;
      if (this.$refs.form.validate()) {
        try {
          await this.$axios.post("api/accounts/telephone", this.data, {
            headers: {
              Authorization: this.$store.state.Identity.auth,
            },
          });
          this.user.telephone = this.data.telephone;
          this.show = false;
        } catch (err) {
          console.error(err);
        }
      }
    },
  },
};
</script>
