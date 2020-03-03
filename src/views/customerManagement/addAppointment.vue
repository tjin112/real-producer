<template>
  <v-container fluid>
    <v-card class="pa-2 mx-auto" max-width="600">
      <v-row no-gutters>
        <v-col cols="12" class="pa-2">
          <v-icon color="primary" class="mr-2">mdi-account</v-icon>Taimin
        </v-col>
        <v-col cols="12" class="pa-2">
          <v-text-field
            dense=""
            label="Address"
            prepend-icon="mdi-home"
            outlined
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12" lg="6" class="pa-2">
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
        <v-col cols="12" class="pa-2">
          <v-textarea
            v-model="notes"
            name="input-7-1"
            label="Note:"
            auto-grow
            rows="1"
            outlined
            dense
            prepend-icon="mdi-note"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-btn class="mt-5 float-right mb-5" dark large color="primary"
        >Save</v-btn
      >
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "addAppointment",
  title: "Add listing appointment ",
  path: "/addappointment",
  layout: "identity",

  data: vm => ({
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
    notes: null
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

<style scoped></style>
