<template>
  <v-container fluid>
    <v-card>
      <v-list>
        <v-list-item ripple @click="$refs.upload.click()">
          <v-list-item-avatar>
            <img v-if="!!user.avatar" :src="user.avatar" />
            <v-icon v-else x-large>mdi-account-circle</v-icon>
          </v-list-item-avatar>
          <input
            ref="upload"
            type="file"
            style="display: none"
            accept="image/*"
            @change="setAvatar"
          />
          <v-spacer></v-spacer>
          <v-icon>mdi-chevron-right</v-icon>
        </v-list-item>
        <v-divider></v-divider>
        <nickname-editor v-slot="{ on }">
          <v-list-item ripple v-on="on">
            <v-list-item-content>
              {{ user.nickName || "设置昵称" }}
            </v-list-item-content>
            <v-spacer></v-spacer>
            <v-icon>mdi-chevron-right</v-icon>
          </v-list-item>
        </nickname-editor>
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

export default {
  name: "Me",
  path: "/me",
  auth: true,
  back: "/",
  components: { NicknameEditor, MobileEditor, GenderSelector, PasswordEditor },
  data: () => ({
    snackbar: false,
    timeout: 3000,
    tip: ""
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
