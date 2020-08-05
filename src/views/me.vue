<template>
  <v-container fluid>
    <v-card class="mb-4">
      <v-list>
        <v-subheader>Personal Information</v-subheader>
        <v-list-item ripple>
          <v-row class="" style="width:100%" no-gutters>
            <v-col cols="4" @click="$refs.upload.click()">
              <v-avatar class="profile" size="70" tile>
                <v-img v-if="!!user.avatar" :src="user.avatar" />
                <v-icon v-else x-large>mdi-account-circle</v-icon>
              </v-avatar>
              <input
                ref="upload"
                type="file"
                style="display: none"
                accept="image/*"
                @change="setAvatar"
              />
            </v-col>
            <v-col cols="8">
              <nickname-editor v-slot="{ on }">
                <v-list-item ripple v-on="on" class="pa-0 fill-height">
                  {{ $store.state.Identity.user.firstName || "设置昵称" }}
                  {{ $store.state.Identity.user.lastName || "" }}
                  <v-spacer></v-spacer>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-list-item>
              </nickname-editor>
            </v-col>
          </v-row>
          <v-spacer></v-spacer>
        </v-list-item>
        <v-divider></v-divider>
        <v-divider></v-divider>
        <mobile-editor v-slot="{ on }">
          <v-list-item ripple v-on="on">
            <v-list-item-icon>
              <v-icon color="red">mdi-phone</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              {{ user.mobile || "绑定手机号" }}
            </v-list-item-content>
            <v-spacer></v-spacer>
            {{ user.mobile ? "解绑" : "" }}
            <v-icon>mdi-chevron-right</v-icon>
          </v-list-item>
        </mobile-editor>
        <v-divider></v-divider>
        <EmailEditor v-slot="{ on }">
          <v-list-item ripple v-on="on">
            <v-list-item-icon>
              <v-icon color="indigo">mdi-email</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              {{ $store.state.Identity.user.email || "set up your email" }}
            </v-list-item-content>
            <v-icon>mdi-chevron-right</v-icon>
          </v-list-item>
        </EmailEditor>
        <v-divider></v-divider>
        <password-editor v-slot="{ on }">
          <v-list-item ripple v-on="on">
            <v-list-item-content>
              {{ user.hasPassword ? "修改密码" : "设置密码" }}
            </v-list-item-content>
            <v-spacer></v-spacer>
            <v-icon>mdi-chevron-right</v-icon>
          </v-list-item>
        </password-editor>
      </v-list>
    </v-card>
    <!-- 公司信息 -->
    <v-card class="mt-2 mx-auto">
      <FirmEditor v-slot="{ on }">
        <v-list>
          <v-subheader>Company Information</v-subheader>
          <v-list-item v-on="on" ripple>
            <v-list-item-icon>
              <v-icon color="indigo">mdi-briefcase</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                $store.state.Identity.user.company
              }}</v-list-item-title>
             
            </v-list-item-content>
            <v-spacer></v-spacer>
            <v-icon>mdi-chevron-right</v-icon>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item v-on="on" ripple>
            <v-list-item-icon>
              <v-icon color="indigo">mdi-map-marker</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                $store.state.Identity.user.companyAddress
              }}</v-list-item-title>
            
            </v-list-item-content>
            <v-icon>mdi-chevron-right</v-icon>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item v-on="on" ripple>
            <v-list-item-icon>
              <v-icon color="indigo">mdi-email</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                $store.state.Identity.user.companyEmail
              }}</v-list-item-title>
          
            </v-list-item-content>
            <v-icon>mdi-chevron-right</v-icon>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item v-on="on" ripple>
            <v-list-item-icon>
              <v-icon color="red">mdi-phone</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                $store.state.Identity.user.companyTel
              }}</v-list-item-title>
              <v-list-item-subtitle>Company Fax</v-list-item-subtitle>
            </v-list-item-content>
            <v-icon>mdi-chevron-right</v-icon>
          </v-list-item>
          <!-- <v-divider :key="item.index"></v-divider> -->
          <!-- </template> -->
        </v-list>
      </FirmEditor>
    </v-card>
    <v-snackbar v-model="snackbar" color="error" :timeout="timeout" top>
      {{ tip }}
    </v-snackbar>
  </v-container>
</template>

<script>
import NicknameEditor from "@/components/Me/NickNameEditor";
import MobileEditor from "@/components/Me/MobileEditor";
import PasswordEditor from "@/components/Me/PasswordEditor";
import EmailEditor from "@/components/Me/EmailEditor";
import FirmEditor from "@/components/Me/FirmEditor";
export default {
  name: "Profile",
  path: "/me",
  auth: true,
  back: "/",
  layout: "identity",
  components: {
    NicknameEditor,
    MobileEditor,
    PasswordEditor,
    EmailEditor,
    FirmEditor,
  },
  data: () => ({
    snackbar: false,
    timeout: 3000,
    tip: "",
    email: "",
    userInfo: "",
    name: "",
    firm: [
      {
        name: "",
        text: "set up firm name",
      },
      {
        name: "",
        text: "set up firm address",
      },
      {
        name: "",
        text: "set up firm fax",
      },
      {
        name: "",
        text: "set up firm email",
      },
    ],
  }),

  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  created() {
    this.getUser();
  },
  methods: {
    async getUser() {
      const user = await this.$axios.get("/api/accounts/", {
        headers: {
          Authorization: sessionStorage.getItem("auth"),
        },
      });
      this.$store.commit("SET_USER", user.data);
      localStorage.setItem("userInfo", JSON.stringify(user.data));
      this.firm[0].name = this.$store.state.Identity.user.company;
      this.firm[1].name = this.$store.state.Identity.user.companyAddress;
      this.firm[2].name = this.$store.state.Identity.user.companyTel;
      this.firm[3].name = this.$store.state.Identity.user.companyEmail;
    },
    async setAvatar() {},
  },
};
</script>
<style></style>
