<template>
  <v-container fluid>
    <v-form v-model="valid" ref="form" class="mt-6" lazy-validation>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="data.mobile"
            class="ma-0 pa-0"
            label="请输入手机号"
            :rules="form.mobile.rules"
          ></v-text-field>
        </v-col>
        <v-col v-if="canSend" cols="8" class="pr-0">
          <v-text-field
            v-model="data.captcha"
            class="ma-0 pa-0"
            label="请输入验证码"
            :rules="form.captcha.rules"
          ></v-text-field>
        </v-col>
        <v-col v-if="canSend" cols="4" class="text-center pl-0 pr-0">
          <a style="color:#009688" @click="sendCaptcha">
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
            @click="register"
            >注册
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
    <v-snackbar v-model="snackbar" color="error" :timeout="timeout" top>
      {{ tip }}
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  name: "Register",
  path: "/reg",
  layout: "identity",
  data: () => ({
    valid: false,
    canResend: true,
    captchaText: "获取验证码",
    snackbar: false,
    timeout: 3000,
    tip: "",
    data: {
      mobile: "",
      captcha: ""
    },
    form: {
      mobile: {
        rules: [val => (val && /^1[3-9]\d{9}$/.test(val)) || "请输入正确手机号"]
      },
      captcha: {
        rules: [val => !!val || "请输入验证码"]
      }
    }
  }),
  computed: {
    canSend() {
      return /^1[3-9]\d{9}$/.test(this.data.mobile);
    }
  },
  methods: {
    sendCaptcha() {
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
    async register() {
      if (this.$refs.form.validate()) {
        try {
          const { data: token } = await this.$axios.post("/account", this.data);
          this.$store.commit("SET_TOKEN", token);
          this.$router.push(this.$route.query.redirect || "/");
        } catch (e) {
          this.snackbar = true;
          switch (e.response.status) {
            default:
              this.tip = "注册失败";
              break;
          }
        }
      }
    }
  }
};
</script>
