export default {
  state: {
    identity: undefined,
    user: {}
  },
  mutations: {
    SET_TOKEN(state, token) {
      localStorage.setItem("token", JSON.stringify(token));
      const now = Date.parse(new Date()) / 1000;
      if (token.access_token && token.expires_at > now) {
        state.identity = {
          auth: true,
          token: token.access_token,
          expired: token.expires_at
        };
      }
    },
    SET_USER(state, user) {
      state.user = user;
    },
    LOGOUT(state) {
      state.identity = undefined;
      state.user = {};
      localStorage.removeItem("token");
    }
  },
  getters: {
    identity(state) {
      const now = Date.parse(new Date()) / 1000;
      if (!state.identity) {
        state.identity = { auth: false };
        const tokenStr = localStorage.getItem("token");
        try {
          const token = !!tokenStr && JSON.parse(tokenStr);
          if (token.access_token && token.expires_at > now) {
            state.identity = {
              auth: true,
              token: token.access_token,
              expired: token.expires_at
            };
          }
        } catch (err) {
          console.error("获取票据发生错误", err);
        }
      }
      // 票据过期
      if (state.identity.auth && state.identity.expired <= now) {
        state.identity = { auth: false };
      }
      return state.identity;
    },
    user(state) {
      return state.user;
    }
  },
  actions: {}
};
