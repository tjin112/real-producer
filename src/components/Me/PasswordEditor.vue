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
        <v-toolbar-title>修改密码</v-toolbar-title>
      </v-toolbar>
      <v-container fluid>
        <v-form v-model="valid" ref="form" class="mt-6" lazy-validation>
          <v-row>
            <v-col cols="12">
              <!-- 输入原始密码 -->
              <v-text-field
                v-model="data.oldPwd"
                class="ma-0 pa-0"
                label="请输入current password"
                :rules="form.oldPwd.rules"
                :append-icon="showOldPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showOldPassword = !showOldPassword"
                :type="showOldPassword ? 'text' : 'password'"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="data.password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                :type="showPassword ? 'text' : 'password'"
                class="ma-0 pa-0"
                label="请输入new password"
                :rules="form.password.rules"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="data.repassword"
                class="ma-0 pa-0"
                label="请再次输入new password"
                :rules="form.repassword.rules"
                :append-icon="repassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="repassword = !repassword"
                :type="repassword ? 'text' : 'password'"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-btn
                class="white--text"
                color="primary"
                :disabled="!valid"
                block
                x-large
                @click="setPassword"
                :loading="loading"
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
  name: "PasswordEditor",
  data() {
    return {
      dialog: false,
      valid: false,
      canResend: true,
      isSending: false,
      showPassword: false,
      showOldPassword: false,
      repassword: false,
      loading: false,
      data: {
        captcha: "",
        oldPwd: "",
        password: "",
        repassword: "",
      },
      form: {
        captcha: {
          rules: [(val) => !!val || "请输入验证码"],
        },
        oldPwd: {
          rules: [(val) => !!val || "不能为空"],
        },
        password: {
          rules: [
            (val) => !!val || "请输入密码",
            (val) =>
              /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,12}$/.test(
                val
              ) || "请输入密码包括至少一个大写字母，数字以及特殊符号",
          ],
        },
        repassword: {
          rules: [
            (v) => (!!v && v) === this.data.password || "Values do not match",
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
    async setPassword() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        try {
          await this.$axios.put(
            "/api/accounts/password",
            {
              originalPassword: this.data.oldPwd,
              newPassword: this.data.password,
            },
            {
              headers: {
                Authorization: sessionStorage.getItem("auth"),
              },
            }
          );
          this.user.HasPassword = true;
          this.loading = false;
          this.show = false;
        } catch (err) {
          console.error(err);
        }
      }
    },
  },
};
</script>
