<template>
  <v-container fluid>
    <v-card class="pb-2 mx-auto" max-width="600">
      <v-list>
        <v-list-item ripple>
          <v-icon color="primary" class="mr-2">mdi-account</v-icon>Taimin Jin
        </v-list-item>
        <v-list-item>
          <v-text-field label="MLS NO."></v-text-field>
        </v-list-item>
        <v-list-item>
          <v-row no-gutters="">
            <v-col cols="12" lg="6">
              <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="dateFormatted"
                    label="Date"
                    hint="MM/DD/YYYY"
                    persistent-hint
                    prepend-icon="mdi-calendar"
                    @blur="date = parseDate(dateFormatted)"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  no-title
                  @input="menu1 = true"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-list-item>
      </v-list>
      <v-btn class="mt-5 float-right mb-5" dark large color="primary"
        >Save</v-btn
      >
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "addShowing",
  title: "Add new Showing",
  path: "/addshowing",
  layout: "identity",
  data: vm => ({
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false
  }),

  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date);
    }
  },

  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      console.log(date);
      console.log([month, day, year]);
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
  }
};
</script>

<style></style>
