<template>
  <v-bottom-sheet v-model="sheet">
    <template v-slot:activator="{ on }">
      <slot v-bind:on="on"></slot>
    </template>
    <v-sheet height="110px">
      <v-list>
        <v-list-item-group
          v-model="gender"
          active-class="teal--text text--accent-4"
        >
          <v-list-item value="男" ripple>
            <v-list-item-content style="justify-content: center">
              男
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item value="女" ripple>
            <v-list-item-content style="justify-content: center">
              女
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      sheet: false
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    gender: {
      set(val) {
        this.sheet = false;
        if (val === "男") {
          this.user.gender = 1;
        } else if (val === "女") {
          this.user.gender = 2;
        }
        this.setGender(this.user.gender);
      },
      get() {
        if (this.user.gender) {
          if (this.user.gender === 1) {
            return "男";
          } else if (this.user.gender === 2) {
            return "女";
          }
        }
        return "设置性别";
      }
    }
  },
  methods: {
    async setGender(gender) {
      await this.$axios.patch("/s/user/gender", {
        gender
      });
    }
  }
};
</script>

<style lang="" scoped></style>
