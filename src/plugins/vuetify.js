import Vue from "vue";
import Vuetify from "vuetify/lib";
import zhHans from "vuetify/es5/locale/zh-Hans";
import colors from 'vuetify/lib/util/colors'
Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { zhHans },
    current: "zhHans"
  },
  theme: {
    themes: {
      light: {
        primary: colors.indigo, 
        secondary: colors.red.lighten4,
        accent: colors.indigo.base 
      }
    }
  }
});
