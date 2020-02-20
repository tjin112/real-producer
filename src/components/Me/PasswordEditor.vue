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
      <v-toolbar dark color="teal">
        <v-btn icon dark @click="show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{
          user.hasPassword ? "修改密码" : "设置密码"
        }}</v-toolbar-title>
      </v-toolbar>
      <v-container fluid>
        <v-form v-model="valid" ref="form" class="mt-6" lazy-validation>
          <v-row>
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
              <a style="color:#009688" @click="sendCaptcha">
                {{ captchaText }}
              </a>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="data.password"
                type="password"
                class="ma-0 pa-0"
                label="请输入密码"
                :rules="form.password.rules"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-btn
                class="white--text"
                color="teal"
                :disabled="!valid"
                block
                x-large
                @click="setPassword"
                >保存
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
  name: "PasswordEditor",
  data() {
    return {
      dialog: false,
      valid: false,
      canResend: true,
      isSending: false,
      captchaText: "获取验证码",
      data: {
        captcha: "",
        password: ""
      },
      form: {
        captcha: {
          rules: [val => !!val || "请输入验证码"]
        },
        password: {
          rules: [
            val => !!val || "请输入密码",
            val =>
              /^.*(?=.{6,20})(?=.*\d)(?=.*[A-Za-z]).*$/.test(val) ||
              "密码为6-20，字母、数字和字符组成"
          ]
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
    sendCaptcha() {
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
    async setPassword() {
      if (this.$refs.form.validate()) {
        try {
          await this.$axios.patch("/account/password", this.data);
          this.user.HasPassword = true;
          this.show = false;
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
};
</script>
