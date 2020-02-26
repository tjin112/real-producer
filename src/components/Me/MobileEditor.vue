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
          !!user.mobile ? "解绑手机" : "绑定手机"
        }}</v-toolbar-title>
      </v-toolbar>
      <v-container fluid>
        <v-form v-model="valid" ref="form" class="mt-6" lazy-validation>
          <v-row v-if="user.mobile">
            <v-col cols="12">
              <v-text-field
                :value="`当前手机号：${user.mobile || ''}`"
                class="ma-0 pa-0"
                readonly
                solo
              ></v-text-field>
            </v-col>
            <v-col cols="8" class="pr-0">
              <v-text-field
                v-model="data.captcha"
                class="ma-0 pa-0"
                label="请输入验证码"
                :rules="form.captcha.rules"
              ></v-text-field>
            </v-col>
            <v-col cols="4" class="text-center pl-0 pr-0">
              <a style="color:#009688" @click="sendUnbindCaptcha">
                {{ captchaText }}
              </a>
            </v-col>
            <v-col cols="12">
              <v-btn
                class="white--text"
                color="teal"
                :disabled="!valid"
                block
                x-large
                @click="unbind"
                >解绑手机号
              </v-btn>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col cols="12">
              <v-text-field
                v-model="data.mobile"
                class="ma-0 pa-0"
                label="请输入手机号"
                :rules="form.mobile.rules"
              ></v-text-field>
            </v-col>
            <v-col cols="8" class="pr-0">
              <v-text-field
                v-model="data.captcha"
                class="ma-0 pa-0"
                label="请输入验证码"
                :rules="form.captcha.rules"
              ></v-text-field>
            </v-col>
            <v-col cols="4" class="text-center pl-0 pr-0">
              <a style="color:#009688" @click="sendBindCaptcha">
                {{ captchaText }}
              </a>
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
        mobile: "",
        captcha: ""
      },
      form: {
        mobile: {
          rules: [
            val => !!val || "请输入手机号",
            val => (val && /^1[3-9]\d{9}$/.test(val)) || "请输入正确手机号"
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
          this.$axios.post(`/verification/captcha/${this.data.mobile}`);
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
          this.user.mobile = this.data.mobile;
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
    }
  }
};
</script>
