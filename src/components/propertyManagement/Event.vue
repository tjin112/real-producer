<template>
  <div>
    <v-card class="pa-4 mt-2">
      <v-toolbar-title class="grey--text mb-2">Renew Date</v-toolbar-title>
      <!-- 保险到期日 -->
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
            label="Remind renew insurance date"
            hint="MM/DD/YYYY"
            persistent-hint
            prepend-icon="mdi-calendar"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="renewDate" no-title @input="menu1 = true">
        </v-date-picker>
      </v-menu>
      <!-- 租金调整 -->
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
            v-model="adjustRentReminders"
            label="Remind adjust rent"
            hint="MM/DD/YYYY"
            persistent-hint
            prepend-icon="mdi-calendar"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="adjustRentReminders"
          no-title
          @input="menu2 = true"
        >
        </v-date-picker>
      </v-menu>
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
        v-model="weCompany"
      ></v-text-field>
      <v-text-field
        label="phone"
        placeholder="Placeholder"
        outlined
        clearable
        dense
        prepend-icon="mdi-phone"
        v-model="weCompanyTel"
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
        v-model="whCompany"
      ></v-text-field>
      <v-text-field
        label="phone"
        placeholder="Placeholder"
        outlined
        clearable
        dense
        prepend-icon="mdi-phone"
        v-model="whCompanyTel"
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
        v-model="hfCompany"
      ></v-text-field>
      <v-text-field
        label="phone"
        placeholder="Placeholder"
        outlined
        clearable
        dense
        prepend-icon="mdi-phone"
        v-model="hfCompanyTel"
      ></v-text-field>
    </v-card>
    <v-row class="mt-3">
      <v-col cols="12" align="center">
        <v-btn color="primary" width="70%" @click="save()">save</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    property: Object,
    startDate: String,
    endDate: String,
    tenants: Array,
  },
  data: (vm) => ({
    renewDate: new Date().toISOString().substr(0, 10),
    renewFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    adjustRentReminders: new Date().toISOString().substr(0, 10),
    adjustRentRemindersFormatted: vm.formatDate(
      new Date().toISOString().substr(0, 10)
    ),
    menu1: false,
    menu2: false,
    picker: null,
    alarm1: null,
    modal1: false,
    alarm2: null,
    modal2: false,
    weCompany: "",
    weCompanyTel: "",
    whCompany: "",
    whCompanyTel: "",
    hfCompany: "",
    hfCompanyTel: "",
  }),
  watch: {
    renewDate() {
      this.renewFormatted = this.formatDate(this.renewDate);
    },
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
    },
    async save() {
      let insuranceExp = Date.parse(this.tenants.insuranceExp);
      let renewStamp = Date.parse(this.renewDate);
      let rentStamp = Date.parse(this.adjustRentReminders);
      let startStamp = Date.parse(this.startDate);
      let endStamp = Date.parse(this.endDate);
      console.log(this.renewDate);
      console.log(renewStamp);
      console.log(this.adjustRentReminders);
      console.log(rentStamp);
      try {
        await this.$axios.post(
          "/api/properties",
          {
            customerId: 4,
            city: this.property.city,
            region: this.property.region,
            address: this.property.address,
            startTime: startStamp,
            endTime: endStamp,
            tenants: [
              {
                name: this.tenants.name,
                telephone: this.tenants.telephone,
                email: this.tenants.email,
              },
            ],
            insuranceNo: this.tenants.insurance,
            insuranceExpiryDate: insuranceExp,
            // 续约保险提醒日期
            insuranceExpiryReminders: renewStamp.toString(),
            // 租金调整日期
            adjustRentReminders: rentStamp.toString(),
            weCompany: this.weCompany,
            weCompanyTel: this.weCompanyTel,
            whCompany: this.whCompany,
            whCompanyTel: this.whCompanyTel,
            hfCompany: this.hfCompany,
            hfCompanyTel: this.hfCompanyTel,
          },
          {
            headers: {
              Authorization: sessionStorage.getItem("auth"),
            },
          }
        );
      } catch (e) {
        console.log(e);
      }
      console.log(this.tenants);
    },
  },
};
</script>

<style></style>
