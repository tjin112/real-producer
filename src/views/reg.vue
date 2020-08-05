<template>
  <v-container fluid>
    <v-form v-model="valid" ref="form" class="mt-6" lazy-validation>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="data.trebId"
            class="ma-0 pa-0"
            label="请输入trabId"
            :rules="[form.trebId]"
            :error-messages="trebidCheck"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="data.password"
            class="ma-0 pa-0"
            label="请输入密码"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="form.pwd.rules"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="pwd2"
            class="ma-0 pa-0"
            label="请再次输入密码"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            :rules="[form.cpwd]"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="data.firstName"
            class="ma-0 pa-0"
            label="请输入firstname"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="data.lastName"
            class="ma-0 pa-0"
            label="请输入lastname"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="data.email"
            class="ma-0 pa-0"
            label="请输入email地址"
            :rules="form.email.rules"
            :error-messages="emailCheck"
          ></v-text-field>
        </v-col>
        <v-col v-if="canSend" cols="8" class="pr-0">
          <v-text-field
            v-model="data.verifyCode"
            class="ma-0 pa-0"
            label="请输入验证码"
            :rules="form.verifyCode.rules"
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
  data() {
    return {
      valid: false,
      canResend: true,
      captchaText: "获取验证码",
      snackbar: false,
      timeout: 3000,
      tip: "",
      trebidCheck: "",
      emailCheck: "",
      userHint: "",
      pwd2: "",
      showPassword: false,
      data: {
        email: "",
        verifyCode: "",
        password: "",
        trebId: "",
        firstName: "",
        lastName: "",
      },
      form: {
        trebId: (val) => {
          return !!val || "trebId不能为空";
        },
        email: {
          rules: [
            (val) =>
              (val &&
                /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/.test(
                  val
                )) ||
              "请输入正确邮箱地址",
          ],
        },
        verifyCode: {
          rules: [(val) => !!val || "请输入验证码"],
        },
        pwd: {
          rules: [
            (val) =>
              (val &&
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,12}$/.test(
                  val
                )) ||
              "请输入密码包括至少一个大写字母，数字以及特殊符号",
          ],
        },
        cpwd: (val) => {
          return (
            (val !== "" && val === this.data.password) || "两次密码输入不一致"
          );
        },
      },
    };
  },
  watch: {
    "data.trebId": {
      handler: function() {
        const check = setInterval(() => {
          if (this.data.trebId) {
            this.$axios
              .get("/api/accounts/checkout/trebid", {
                params: {
                  trebid: this.data.trebId,
                },
              })
              .then((res) => {
                if (!res.data) {
                  this.trebidCheck = "已经被注册";
                } else {
                  this.trebidCheck = "";
                }
              });
          }
        }, 1000);
        setTimeout(() => {
          clearInterval(check);
        }, 1000);
      },
    },
    "data.email": {
      handler: function() {
        var validate = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;
        if (validate.test(this.data.email)) {
          const emailCheck = setInterval(() => {
            this.$axios
              .get("/api/accounts/checkout/email", {
                params: {
                  email: this.data.email,
                },
              })
              .then((res) => {
                if (!res.data) {
                  this.emailCheck = "已经被注册";
                } else {
                  this.emailCheck = "";
                }
              });
          }, 1000);
          setTimeout(() => {
            clearInterval(emailCheck);
          }, 1000);
        }
      },
    },
  },
  computed: {
    canSend() {
      return /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/.test(
        this.data.email
      );
    },
  },
  methods: {
    // 发送验证码
    sendCaptcha() {
      if (this.canResend) {
        this.$axios.post(`/api/verification/email/${this.data.email}`);
        let time = 10;
        this.canResend = false;
        const resend = setInterval(() => {
          this.captchaText = `${time--}秒后重试`;
        }, 1000);
        setTimeout(() => {
          clearInterval(resend);
          this.captchaText = "重新获取验证码";
          this.canResend = true;
        }, 10000);
      }
    },
    async register() {
      if (this.$refs.form.validate()) {
        try {
          const test = await this.$axios.post("/api/accounts", this.data);
          console.log(test);
          // this.$store.commit("SET_TOKEN", token);
          // this.$router.push(this.$route.query.redirect || "/");
        } catch (e) {
          this.snackbar = true;
          switch (e.response.data) {
            default:
              this.tip = e.response.data;
              break;
          }
        }
      }
    },
    // register() {
    //       console.log("123");
    //   if (this.$refs.form.validate()) {
    //     this.$axios.post("/api/accounts", this.data).then(res => {
    //       console.log("123");
    //       console.log(res);
    //     });
    //   }
    // },
  },
};
</script>
