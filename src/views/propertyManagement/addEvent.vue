<template>
  <v-container fluid>
    <v-card class="pa-4">
      <v-toolbar-title class="grey--text mb-2">房东信息</v-toolbar-title>
      <v-text-field
        label="房东"
        placeholder="Placeholder"
        outlined
        clearable
        dense
        prepend-icon="mdi-account"
      ></v-text-field>
      <v-text-field
        label="地址"
        placeholder="Placeholder"
        outlined
        clearable
        dense
        prepend-icon="mdi-home"
      ></v-text-field>
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
            v-model="startFormatted"
            label="Start Date"
            hint="MM/DD/YYYY"
            persistent-hint
            prepend-icon="mdi-calendar"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="startDate" no-title @input="menu1 = true">
        </v-date-picker>
      </v-menu>
      <v-menu
        ref="menu2"
        v-model="menu2"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="endFormatted"
            label="End Date"
            hint="MM/DD/YYYY"
            persistent-hint
            prepend-icon="mdi-calendar"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="endDate" no-title> </v-date-picker>
      </v-menu>
    </v-card>
    <v-card class="pa-4 mt-2">
      <v-toolbar-title class="grey--text mb-2">Resident</v-toolbar-title>
      <v-text-field
        label="Resident name"
        placeholder="name"
        outlined
        clearable
        dense
        prepend-icon="mdi-account"
      ></v-text-field>
      <v-text-field
        label="phone"
        placeholder="Placeholder"
        outlined
        clearable
        dense
        prepend-icon="mdi-phone"
      ></v-text-field>
      <v-text-field
        label="email"
        placeholder="Placeholder"
        outlined
        clearable
        dense
        prepend-icon="mdi-email"
      ></v-text-field>
      <v-text-field
        label="保险到期时间"
        placeholder="MM/DD/YY"
        outlined
        clearable
        dense
        prepend-icon="mdi-calendar"
      ></v-text-field>
    </v-card>
    <Event />
  </v-container>
</template>

<script>
import Event from "@/components/propertyManagement/Event";
export default {
  name: "addEvent",
  title: "Add New Event",
  path: "/addevent",
  layout: "identity",
  components: {
    Event
  },
  data: vm => ({
    startDate: new Date().toISOString().substr(0, 10),
    endDate: new Date().toISOString().substr(0, 10),
    startFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    endFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
    menu2: false,
    notes: null
  }),

  watch: {
    startDate() {
      this.startFormatted = this.formatDate(this.startDate);
    },
    endDate() {
      this.endFormatted = this.formatDate(this.endDate);
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
