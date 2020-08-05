<template>
  <v-container fluid class="pa-4">
    <v-img src="https://picsum.photos/510/300?random" aspect-ratio="2"></v-img>
    <v-form v-model="valid" ref="form" class="mt-6" lazy-validation>
      <v-row no-gutters>
        <v-col cols="12" v-if="trebIdShow">
          <v-text-field
            v-model="data.username"
            class="ma-0 pa-0"
            label="please input your treb ID"
            :rules="form.trebid.rules"
          ></v-text-field>
        </v-col>

        <v-col cols="12" v-else>
          <v-text-field
            v-model="data.username"
            class="ma-0 pa-0"
            label="please input your Email"
            :rules="form.email.rules"
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="d-flex justify-end" v-if="trebIdShow">
          <v-btn
            class="ma-2 "
            outlined
            color="indigo"
            x-small
            @click="
              trebIdShow = !trebIdShow;
              data.mode = 'email';
            "
            ><v-icon left>mdi-email</v-icon> login by email</v-btn
          >
        </v-col>
        <v-col cols="12" class="d-flex justify-end" v-else>
          <v-btn
            class="ma-2 "
            outlined
            color="indigo"
            x-small
            @click="
              trebIdShow = !trebIdShow;
              data.mode = 'username';
            "
            ><v-icon left>mdi-email</v-icon> login by trebid</v-btn
          >
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
        <v-col cols="12" class="text-center pl-0 pr-0 d-flex justify-end">
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
          <a color="primary" @click="$router.push('/reg')"
            >Don't have an account?</a
          >
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
import qs from "qs";
export default {
  name: "Login",
  path: "/login",
  layout: "identity",
  data() {
    return {
      valid: false,
      showPassword: false,
      snackbar: false,
      timeout: 3000,
      trebIdShow: true,
      tip: "",
      data: {
        username: "",
        mode: "username",
        password: "",
        grant: "password",
      },
      form: {
        trebid: {
          rules: [(val) => !!val || "请输入treb ID"],
        },
        email: {
          rules: [
            (val) => !!val || "请输入邮箱",
            (val) =>
              (val &&
                /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/.test(
                  val
                )) ||
              "请输入正确邮箱",
          ],
        },
        password: {
          rules: [(val) => !!val || "请输入密码"],
        },
      },
    };
  },
  methods: {
    async login() {
      this.isSending = false;
      this.data = qs.stringify(this.data);
      if (this.$refs.form.validate()) {
        try {
          const data = await this.$axios.post("/api/accounts/token", this.data);
          this.$store.commit("SET_TOKEN", data);
          this.$router.push(this.$route.query.redirect || "/me");
        } catch (e) {
          this.snackbar = true;
          this.tip = "failed to login";
          console.log(e.response);
          // switch (e.response.status) {
          //   case 401:
          //     this.tip = `手机号或${this.isCaptcha ? "验证码" : "密码"}错误`;
          //     break;
          //   default:
          //     this.tip = "登录中出现错误";
          //     break;
          // }
        }
      }
    },
  },
};
</script>
