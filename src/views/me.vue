<template>
  <v-container fluid>
    <v-card>
      <v-list>
        <v-list-item ripple>
          <v-row class="" style="width:100%" no-gutters>
            <v-col cols="4" @click="$refs.upload.click()">
              <v-avatar class="profile" size="90" tile>
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
                  <v-list-item-content>
                    {{ user.nickName || "设置昵称" }}
                  </v-list-item-content>
                  <v-spacer></v-spacer>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-list-item>
              </nickname-editor>
            </v-col>
          </v-row>
          <v-spacer></v-spacer>
        </v-list-item>
        <v-divider></v-divider>
        <gender-selector v-slot="{ on }">
          <v-list-item ripple v-on="on">
            <v-list-item-content>
              {{ user.gender | genders }}
            </v-list-item-content>
            <v-spacer></v-spacer>
            <v-icon>mdi-chevron-right</v-icon>
          </v-list-item>
        </gender-selector>
        <v-divider></v-divider>
        <mobile-editor v-slot="{ on }">
          <v-list-item ripple v-on="on">
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
            <v-list-item-content>
              {{ email ? email : "set up your email" }}
            </v-list-item-content>
            <v-spacer></v-spacer>
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
        <!-- <v-divider></v-divider>
        <v-list-item to="/">
          <v-list-item-content>
            实名认证
          </v-list-item-content>
          <v-spacer></v-spacer>
          <v-icon>mdi-chevron-right</v-icon>
        </v-list-item> -->
      </v-list>
    </v-card>
    <v-card class="mt-5 mx-auto">
      <FirmEditor v-slot="{ on }">
        <v-list>
          <template v-for="(item, index) in firm">
            <v-list-item v-on="on" ripple :key="index">
              <v-list-item-content>
                {{ item.name ? item.name : item.text }}
              </v-list-item-content>
              <v-spacer></v-spacer>
              <v-icon>mdi-chevron-right</v-icon>
            </v-list-item>
            <v-divider :key="index"></v-divider>
          </template>
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
import GenderSelector from "@/components/Me/GenderSelector";
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
    GenderSelector,
    PasswordEditor,
    EmailEditor,
    FirmEditor
  },
  data: () => ({
    snackbar: false,
    timeout: 3000,
    tip: "",
    email: "",
    firm: [
      {
        name: "",
        text: "set up firm name"
      },
      {
        name: "",
        text: "set up firm address"
      },
      {
        name: "",
        text: "set up firm fax"
      },
      {
        name: "",
        text: "set up firm email"
      }
    ]
  }),
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  filters: {
    genders(gender) {
      if (gender === 1) {
        return "男";
      } else if (gender === 2) {
        return "女";
      }
    }
  },
  methods: {
    async getUser() {
      const { data: user } = await this.$axios.get("/s/user");
      this.$store.commit("SET_USER", user);
      this.user = this.$store.getters.user;
    },
    async setAvatar(e) {
      const files = e.target.files;
      if (files.length > 0) {
        const file = files[0];
        var formData = new FormData();
        formData.append(
          "target",
          `user/avatar-${new Date().getTime()}.${file.name.split(".").pop()}`
        );
        formData.append("file", file);
        try {
          const result = await this.$axios.post("/files", formData, {
            headers: {
              "content-type": "multipart/form-data"
            }
          });
          this.user.avatar = result.data.uri;
          await this.$axios.patch("/s/user/avatar", {
            avatar: this.user.avatar
          });
          await this.getUser();
        } finally {
          this.$refs.upload.value = "";
        }
      } else {
        this.tip = "请选择头像";
        this.snackbar = true;
      }
    }
  }
};
</script>
<style></style>
