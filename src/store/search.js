export default {
  state: {
    search: undefined
  },
  mutations: {
    SET_SEARCH(state, keyword) {
      if (keyword) {
        if (!state.search) {
          const searchStr = localStorage.getItem("search");
          state.search = searchStr ? JSON.parse(searchStr) : [];
        }
        const hasIndex = state.search.indexOf(keyword);
        if (hasIndex > -1) {
          state.search.splice(hasIndex, 1);
        }
        state.search.push(keyword);
        localStorage.setItem("search", JSON.stringify(state.search));
      }
    }
  },
  getters: {
    search(state) {
      if (!state.search) {
        const searchStr = localStorage.getItem("search");
        state.search = searchStr ? JSON.parse(searchStr) : [];
      }
      return state.search.reverse();
    }
  },
  actions: {}
};
