<template>
  <v-app>
    <v-app-bar color="primary" app dark dense>
      <v-btn v-if="back" icon :to="back">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon to="/search">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon @click="drawer = !drawer">
        <v-avatar size="32">
          <img v-if="!!user.avatar" :src="user.avatar" :alt="user.nickName" />
          <v-icon v-else dark>mdi-account-circle</v-icon>
        </v-avatar>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <template v-slot:prepend>
        <v-img
          src="https://picsum.photos/320/160?random"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        >
          <v-list dark>
            <v-list-item>
              <v-list-item-avatar>
                <img v-if="!!user.avatar" :src="user.avatar" />
                <v-icon v-else x-large>mdi-account-circle</v-icon>
              </v-list-item-avatar>
              <v-spacer></v-spacer>
              <v-btn v-if="identity.auth" icon @click="logout">
                <v-icon>mdi-exit-to-app</v-icon>
              </v-btn>
            </v-list-item>
            <v-list-item link two-line :to="identity.auth ? '/me' : '/login'">
              <v-list-item-content>
                <v-list-item-title class="title">{{
                  identity.auth ? user.nickName || "设置昵称" : "注册/登录"
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-img>
      </template>
      <v-list shaped>
        <v-list-item-group
          v-model="group"
          active-class="teal--text text--accent-4"
        >
          <v-list-item to="orders">
            <v-list-item-icon>
              <v-icon>mdi-file-document-box-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>我的订单</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      identity: { auth: false },
      user: {},
      drawer: false,
      group: undefined
    };
  },
  computed: {
    back() {
      return this.$route.meta.back || "";
    },
    title() {
      return this.$route.meta.title || "";
    }
  },
  watch: {
    $route: "auth",
    group() {
      this.drawer = false;
    }
  },
  async mounted() {
    await this.auth();
  },
  methods: {
    async auth() {
      this.identity = this.$store.getters.identity;
      if (this.identity.auth) {
        this.$axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${this.identity.token}`;
      }
      if (this.identity.auth) {
        this.user = this.$store.getters.user;
        if (!this.user.state) {
          try {
            const { data: user } = await this.$axios.get("/s/user");
            this.$store.commit("SET_USER", user);
            this.user = this.$store.getters.user;
          } catch (err) {
            if (err.response.status === 401) {
              this.$router.push(`/login?redirect=${this.$route.path}`);
            }
          }
        }
      }
      if (this.$route.meta.auth && !this.identity.auth) {
        this.$router.push(`/login?redirect=${this.$route.path}`);
      }
    },
    logout() {
      this.$store.commit("LOGOUT");
      this.identity = this.$store.getters.identity;
      this.user = this.$store.getters.user;
      this.$router.push("/");
    }
  }
};
</script>
