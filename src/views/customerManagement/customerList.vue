<template>
  <v-container class="pa-0">
    <v-list class="pt-0">
      <div
        v-for="(item, index) in customers"
        :key="index"
        @click="getCustomerId(item.id)"
      >
        <div class="grey lighten-1 caption pl-2">{{ item.firstChar }}</div>
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title
              >{{
                item.firstName.charAt(0).toUpperCase() + item.firstName.slice(1)
              }}
              {{
                item.lastName.charAt(0).toUpperCase() + item.lastName.slice(1)
              }}</v-list-item-title
            >
            <v-list-item-subtitle>{{ item.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider inset></v-divider>
      </div>
    </v-list>
  </v-container>
</template>

<script>
export default {
  name: "Contact",
  title: "Contact",
  path: "/customer",
  layout: "identity",
  data() {
    return {
      customers: "",
      letters: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ],
    };
  },
  mounted() {
    this.getContact();
    console.log(this.$router)
  },
  methods: {
    async getContact() {
      const customer = await this.$axios.get(`/api/customers`, {
        headers: {
          Authorization: sessionStorage.getItem("auth"),
        },
      });
      this.customers = customer.data;
      this.customers.sort((a, b) => a.firstName.localeCompare(b.firstName));
      this.setTitle();
    },
    setTitle() {
      for (var index = 0; index < this.customers.length; index++) {
        for (var i = 0; i < this.letters.length; i++) {
          if (
            this.customers[index].firstName.charAt(0).toUpperCase() ===
            this.letters[i]
          ) {
            if (index === 0) {
              this.customers[index].firstChar = this.letters[i];
            } else {
              if (
                this.customers[index].firstName.charAt(0).toUpperCase() !==
                this.customers[index - 1].firstName.charAt(0).toUpperCase()
              ) {
                this.customers[index].firstChar = this.letters[i];
              }
            }
          }
        }
      }

      console.log(this.customers);
    },
    getCustomerId(val) {
      console.log(val);
      this.$router.push({ path: "/customerInfo", query: { id: val } });
    },
  },
};
</script>

<style></style>
