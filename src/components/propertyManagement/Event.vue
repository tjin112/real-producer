<template>
  <div>
    <v-card class="pa-4 mt-2">
      <v-toolbar-title class="grey--text mb-2">Renew Date</v-toolbar-title>
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
            v-model="renewFormatted"
            label="Remind renew date"
            hint="MM/DD/YYYY"
            persistent-hint
            prepend-icon="mdi-calendar"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="renewDate" no-title @input="menu1 = true">
        </v-date-picker>
      </v-menu>
      <v-dialog
        ref="dialog"
        v-model="modal1"
        :return-value.sync="alarm1"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="alarm1"
            label="Alart 1"
            prepend-icon="mdi-alarm"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker v-if="modal1" v-model="alarm1" full-width>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modal1 = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.dialog.save(alarm1)"
            >OK</v-btn
          >
        </v-time-picker>
      </v-dialog>
      <v-dialog
        ref="dialog2"
        v-model="modal2"
        :return-value.sync="alarm2"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="alarm2"
            label="Alart 2"
            prepend-icon="mdi-alarm"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker v-if="modal2" v-model="alarm2" full-width>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modal2 = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.dialog2.save(alarm2)"
            >OK</v-btn
          >
        </v-time-picker>
      </v-dialog>
    </v-card>
    
    
    <v-card class="pa-4 mt-2">
      <v-toolbar-title class="grey--text mb-2">水电气</v-toolbar-title>
      <v-text-field
        label="公司名称"
        placeholder="Placeholder"
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
    </v-card>
    <v-card class="pa-4 mt-2">
      <v-toolbar-title class="grey--text mb-2">热水炉</v-toolbar-title>
      <v-text-field
        label="公司名称"
        placeholder="Placeholder"
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
    </v-card>
    <v-card class="pa-4 mt-2">
      <v-toolbar-title class="grey--text mb-2">暖气炉</v-toolbar-title>
      <v-text-field
        label="公司名称"
        placeholder="Placeholder"
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
    </v-card>
    <v-row class="mt-3">
        <v-col cols="12" align="center">
            <v-btn color="primary" width="70%">save</v-btn>
        </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: vm => ({
    renewDate: new Date().toISOString().substr(0, 10),
    renewFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
    picker: null,
    alarm1: null,
    modal1: false,
    alarm2: null,
    modal2: false
  }),
  watch: {
    renewDate() {
      this.renewFormatted = this.formatDate(this.renewDate);
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
