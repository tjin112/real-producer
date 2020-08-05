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
          <v-form v-model="valid" ref="form" class="mt-0">
            <v-row>
              <v-col cols="12" class="subtitle-1 pa-0 ma-0 pl-6 pr-6 pt-4">
                <v-text-field
                  prepend-icon="mdi-briefcase"
                  v-model="userInfo.company"
                  class="pa-0"
                  :rules="rules"
                  clearable
                  hint="Company Name"
                  :persistent-hint="persistenthint"
                ></v-text-field>
              </v-col>
              <!-- <v-col cols="12" class="subtitle-1 pb-0 pl-6">
                公司地址:
              </v-col> -->
              <v-col cols="12" class="subtitle-1 pa-0 ma-0 pl-6 pr-6 pt-4">
                <v-text-field
                  prepend-icon="mdi-map-marker"
                  v-model="userInfo.companyAddress"
                  class="pa-0"
                  :rules="rules"
                  clearable
                  hint="Company Address"
                  :persistent-hint="persistenthint"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="subtitle-1 pa-0 ma-0 pl-6 pr-6 pt-4">
                <v-text-field
                  prepend-icon="mdi-phone"
                  v-model="userInfo.companyTel"
                  class="pa-0"
                  :rules="rules"
                  clearable
                  hint="Company Fax"
                  :persistent-hint="persistenthint"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="subtitle-1 pa-0 ma-0 pl-6 pr-6 pt-4">
                <v-text-field
                  prepend-icon="mdi-email"
                  v-model="userInfo.companyEmail"
                  class="pa-0"
                  :rules="rules"
                  clearable
                  hint="Company Email"
                  :persistent-hint="persistenthint"
                ></v-text-field>
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
                :loading="loading"
                >Save
              </v-btn>
            </v-col>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" color="" :timeout="timeout">
      processing....
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "FirmEditor",
  data() {
    return {
      persistenthint: true,
      snackbar: false,
      timeout: 2000,
      dialog: false,
      valid: false,
      canResend: true,
      isSending: false,
      captchaText: "获取验证码",
      email: "",
      loading: false,
      userInfo: Object,
      rules: [(value) => !!value || "Cannot be empty."],
    };
  },
  watch: {
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
    async setFirm() {
      this.snackbar = true;
      this.loading = true;
      // 修改公司名称
      await this.$axios.put(
        "/api/accounts/company",
        {
          company: this.userInfo.company,
        },
        {
          headers: {
            Authorization: this.$store.state.Identity.auth
              ? this.$store.state.Identity.auth
              : JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      //修改公司地址
      await this.$axios.put(
        "/api/accounts/company/address",
        {
          companyAddress: this.userInfo.companyAddress,
        },
        {
          headers: {
            Authorization: this.$store.state.Identity.auth
              ? this.$store.state.Identity.auth
              : JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      //编辑公司电话
      await this.$axios.put(
        "/api/accounts/company/telephone",
        {
          companyTelephone: this.userInfo.companyTel,
        },
        {
          headers: {
            Authorization: this.$store.state.Identity.auth
              ? this.$store.state.Identity.auth
              : JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      // 编辑公司邮箱
      await this.$axios.put(
        "/api/accounts/company/email",
        {
          companyEmail: this.userInfo.companyEmail,
        },
        {
          headers: {
            Authorization: this.$store.state.Identity.auth
              ? this.$store.state.Identity.auth
              : JSON.parse(localStorage.getItem("token")),
          },
        }
      );

      // 重新获取用户信息
      await this.$axios
        .get("/api/accounts/", {
          headers: {
            Authorization: this.$store.state.Identity.auth
              ? this.$store.state.Identity.auth
              : JSON.parse(localStorage.getItem("token")),
          },
        })
        .then((res) => {
          this.$store.commit("SET_USER", res.data);
          localStorage.setItem("userInfo", JSON.stringify(res.data));
        });
      this.loading = false;
      this.dialog = false;
    },
  },
};
</script>
