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
          !!user.email ? "解绑Email" : "绑定Email"
        }}</v-toolbar-title>
      </v-toolbar>
      <!-- <v-toolbar dark color="#90A4AE">
        <v-toolbar-title>{{ oldEmail }}</v-toolbar-title>
      </v-toolbar> -->

      <v-container fluid>
        <!-- 获取旧邮箱验证码 -->
        <v-row>
          <v-col cols="12">
            <v-text-field
              :value="oldEmail"
              readonly
              hint="获得原始邮箱验证码"
              persistent-hint
            ></v-text-field>
          </v-col>
          <v-col cols="8" class="pr-0">
            <v-text-field
              v-model="data.OldCaptcha"
              class="ma-0 pa-0"
              label="请输入验证码"
              :rules="form.captcha.rules"
            ></v-text-field>
          </v-col>
          <v-col cols="4" class="text-center pl-0 pr-0">
            <a color="primary" @click="sendUnbindCaptcha">
              {{ oldCaptchaText }}
            </a>
          </v-col>
        </v-row>
        <v-form v-model="valid" ref="form" class="mt-0" lazy-validation>
          <!-- 新邮箱验证码 -->
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="data.email"
                class="ma-0 pa-0"
                label="请输入Email"
                :rules="form.email.rules"
                :error-messages="emailCheck"
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
              <a color="primary" @click="sendBindCaptcha">
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
                >绑定Email
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
      emailCheck: "",
      canResend: true,
      isSending: false,
      captchaText: "获取验证码",
      oldCaptchaText: "获取验证码",
      oldEmail: "",
      originalCaptcha: "",
      email: "",
      data: {
        email: "",
        captcha: "",
        OldCaptcha: "",
      },
      form: {
        email: {
          rules: [
            (val) => !!val || "请输入新的email",
            (val) =>
              (val &&
                /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/.test(
                  val
                )) ||
              "请输入正确邮箱地址",
          ],
        },
        captcha: {
          rules: [(val) => this.isSending || !!val || "请输入验证码"],
        },
      },
    };
  },
  watch: {
    "data.email": {
      handler: function() {
        var validate = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;
        if (validate.test(this.data.email)) {
          console.log("tongguo");
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
    show: {
      handler: function() {
        if (!this.oldEmail) {
          const userInfo = JSON.parse(localStorage.getItem("userInfo"));
          this.oldEmail = userInfo.email;
        }
      },
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
    sendBindCaptcha() {
      if (this.canResend) {
        try {
          this.$axios.post(`/api/verification/email/${this.data.email}`);
        } catch (e) {
          console.log(e);
        }
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
    sendUnbindCaptcha() {
      if (this.canResend) {
        this.$axios.post(`/api/verification/email/${this.oldEmail}`);
        let time = 10;
        this.canResend = false;
        const resend = setInterval(() => {
          this.oldCaptchaText = `${time--}秒后重试`;
        }, 1000);
        setTimeout(() => {
          clearInterval(resend);
          this.oldCaptchaText = "重新获取验证码";
          this.canResend = true;
        }, 10000);
      }
    },
    async bind() {
      this.isSending = false;
      if (this.$refs.form.validate()) {
        try {
          await this.$axios.put(
            "/api/accounts/email",
            {
              originalCaptcha: this.data.OldCaptcha,
              newEmail: this.data.email,
              newCaptcha: this.data.captcha,
            },
            {
              headers: {
                Authorization: this.$store.state.Identity.auth,
              },
            }
          );
          this.user.mobile = this.data.email;
          this.show = false;
          await this.$axios
            .get("/api/accounts/", {
              headers: {
                Authorization: this.$store.state.Identity.auth,
              },
            })
            .then((res) => {
              this.$store.commit("SET_USER", res.data);
              console.log(this.$store.state.Identity.user);
            });
        } catch (err) {
          console.error(err);
        }
      }
    },
    async unbind() {
      if (this.$refs.form.validate()) {
        try {
          await this.$axios.delete("/account/mobile", {
            captcha: this.data.captcha,
          });
          this.user.mobile = undefined;
          this.show = false;
        } catch (err) {
          console.error(err);
        }
      }
    },
  },
};
</script>
