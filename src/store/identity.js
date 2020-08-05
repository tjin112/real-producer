export default {
  state: {
    identity: '',
    user: {},
    auth: JSON.parse(localStorage.getItem("token")) || null
  },
  mutations: {
    SET_TOKEN(state, token) {
      localStorage.setItem("token", JSON.stringify("Bearer " + token.data.access_token));
      const now = Date.parse(new Date()) / 1000;
      if (token.data.access_token && (token.data.expires_at > now)) {
        state.identity = {
          token: token.data.access_token,
          type: token.data.token_type
        };
      }
      const auth = state.identity.type+" " +state.identity.token
      sessionStorage.setItem("auth",auth)
    },
    SET_USER(state, user) {
      state.user = user;
      state.user.firstName =  state.user.firstName.replace(state.user.firstName[0],state.user.firstName[0].toUpperCase())
      state.user.lastName =  state.user.lastName.replace(state.user.lastName[0],state.user.lastName[0].toUpperCase())
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
  actions: {
  }
};
