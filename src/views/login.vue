<template>
  <v-container fluid class="pa-4">
    <v-img src="https://picsum.photos/510/300?random" aspect-ratio="2"></v-img>
    <v-form v-model="valid" ref="form" class="mt-6" lazy-validation>
      <!-- <v-row v-if="isCaptcha" gutters>
        <v-col cols="12">
          <v-text-field
            v-model="data.username"
            class="ma-0 pa-0"
            label="请输入手机号"
            :rules="form.username.rules"
          ></v-text-field>
        </v-col>
        <v-col cols="8" class="pr-0">
          <v-text-field password
            v-model="data.captcha"
            class="ma-0 pa-0"
            label="请输入密码"
            :rules="form.captcha.rules"
          ></v-text-field>
        </v-col>
        <v-col cols="4" class="text-center pl-0 pr-0">
          <a style="color:#009688" @click="sendCaptcha">
            {{ captchaText }}
          </a>
        </v-col>
      </v-row> -->
      <v-row no-gutters>
        <v-col cols="12">
          <v-text-field
            v-model="data.username"
            class="ma-0 pa-0"
            label="User name or Email"
            :rules="form.username.rules"
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="pr-0 pt-4">
          <v-text-field
            v-model="data.password"
            class="ma-0 pa-0"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            label="Password"
            :rules="form.password.rules"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="text-center pl-0 pr-0 d-flex justify-end" >
          <a color="primary">forget your password?</a>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn
            class="white--text"
            color="primary"
            :disabled="!valid"
            block
            x-large
            @click="login"
            >登录
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="body-2" no-gutters>
        <v-col cols="12 pl-0 pr-0 pt-2 d-flex justify-center">
          <a color="primary" @click="$router.push('/reg')">Don't have an account?</a>
        </v-col>
        <v-col cols="12 pl-0 pr-0 pt-2 d-flex justify-center">
          <a color="primary">Sign in with google</a>
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
  name: "Login",
  path: "/login",
  layout: "identity",
  data() {
    return {
      valid: false,
      isCaptcha: true,
      isSending: false,
      canResend: true,
      showPassword: false,
      captchaText: "获取验证码",
      snackbar: false,
      timeout: 3000,
      tip: "",
      data: {
        username: "",
        captcha: "",
        password: ""
      },
      form: {
        username: {
          rules: [
            val => !!val || "请输入手机号",
            val => (val && /^1[3-9]\d{9}$/.test(val)) || "请输入正确手机号"
          ]
        },
        captcha: {
          rules: [val => this.isSending || !!val || "请输入验证码"]
        },
        password: {
          rules: [val => !!val || "请输入密码"]
        }
      }
    };
  },
  methods: {
    changeMode() {
      this.isCaptcha = !this.isCaptcha;
      this.$refs.form.resetValidation();
    },
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
          this.$axios.post(`/verification/captcha/${this.data.username}`);
        } else {
          this.canResend = true;
        }
      }
    },
    async login() {
      this.isSending = false;
      if (this.$refs.form.validate()) {
        let data = "";
        if (this.isCaptcha) {
          data = `username=${this.data.username}&captcha=${this.data.captcha}&mode=mobile&grant=captcha`;
        } else {
          data = `username=${this.data.username}&password=${this.data.password}&mode=mobile&grant=password`;
        }
        try {
          const { data: token } = await this.$axios.post(
            "/account/token",
            data
          );
          this.$store.commit("SET_TOKEN", token);
          this.$router.push(this.$route.query.redirect || "/");
        } catch (e) {
          this.snackbar = true;
          switch (e.response.status) {
            case 401:
              this.tip = `手机号或${this.isCaptcha ? "验证码" : "密码"}错误`;
              break;
            default:
              this.tip = "登录中出现错误";
              break;
          }
        }
      }
    }
  }
};
</script>
