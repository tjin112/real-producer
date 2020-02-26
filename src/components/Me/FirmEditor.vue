<template>
  <div>
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
          <v-toolbar-title>Firm Editor</v-toolbar-title>
        </v-toolbar>
        <v-container fluid>
          <v-form v-model="valid" ref="form" class="mt-0" lazy-validation>
            <v-row>
              <v-col cols="12" class="subtitle-1 pb-0 pl-6">
                公司名称:
              </v-col>
              <v-col cols="9" class="subtitle-1 pa-0 ma-0 pl-6">
                <v-text-field value="avc" class="pa-0"></v-text-field>
              </v-col>
              <v-col cols="12" class="subtitle-1 pb-0 pl-6">
                公司地址:
              </v-col>
              <v-col cols="9" class="subtitle-1 pa-0 ma-0 pl-6">
                <v-text-field value="avc" class="pa-0"></v-text-field>
              </v-col>
              <v-col cols="12" class="subtitle-1 pb-0 pl-6">
                公司Fax:
              </v-col>
              <v-col cols="9" class="subtitle-1 pa-0 ma-0 pl-6">
                <v-text-field value="6479793401" class="pa-0"></v-text-field>
              </v-col>
              <v-col cols="12" class="subtitle-1 pb-0 pl-6">
                公司邮箱:
              </v-col>
              <v-col cols="9" class="subtitle-1 pa-0 ma-0 pl-6">
                <v-text-field value="avc" class="pa-0"></v-text-field>
              </v-col>
            </v-row>
            <v-col cols="12" class="mt-2">
              <v-btn
                class="white--text"
                color="primary"
                :disabled="!valid"
                block
                x-large
                @click="setFirm"
                >Save
              </v-btn>
            </v-col>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" color="error" :timeout="timeout" top>
      save successfully
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "FirmEditor",
  data() {
    return {
      snackbar: false,
      timeout: 2000,
      dialog: false,
      valid: false,
      canResend: true,
      isSending: false,
      captchaText: "获取验证码",
      email: "",
      data: {
        mobile: "",
        captcha: ""
      },
      form: {
        email: {
          rules: [
            val => !!val || "请输入email",
            val =>
              (val &&
                /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
                  val
                )) ||
              "请输入正确邮箱地址"
          ]
        },
        captcha: {
          rules: [val => this.isSending || !!val || "请输入验证码"]
        }
      }
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
      }
    },
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    sendBindCaptcha() {
      if (this.canResend) {
        this.canResend = false;
        this.isSending = true;
        if (this.$refs.form.validate()) {
          let time = 60;
          const resend = setInterval(() => {
            this.captchaText = `${time--}s后重试`;
          }, 1000);
          setTimeout(() => {
            clearInterval(resend);
            this.captchaText = "重新获取验证码";
            this.canResend = true;
          }, 60000);
          this.$axios.post(`/verification/captcha/${this.data.email}`);
        } else {
          this.canResend = true;
        }
      }
    },
    sendUnbindCaptcha() {
      if (this.canResend) {
        this.canResend = false;
        let time = 60;
        const resend = setInterval(() => {
          this.captchaText = `${time--}s后重试`;
        }, 1000);
        setTimeout(() => {
          clearInterval(resend);
          this.captchaText = "重新获取验证码";
          this.canResend = true;
        }, 60000);
        this.$axios.post("/account/captcha");
      }
    },
    async bind() {
      this.isSending = false;
      if (this.$refs.form.validate()) {
        try {
          await this.$axios.patch("/account/mobile", this.data);
          this.user.mobile = this.data.email;
          this.show = false;
        } catch (err) {
          console.error(err);
        }
      }
    },
    async unbind() {
      if (this.$refs.form.validate()) {
        try {
          await this.$axios.delete("/account/mobile", {
            captcha: this.data.captcha
          });
          this.user.mobile = undefined;
          this.show = false;
        } catch (err) {
          console.error(err);
        }
      }
    },
    setFirm() {
      this.snackbar = true;
      setTimeout(() => {
          this.dialog = false;
      }, 2000);
    }
  }
};
</script>
