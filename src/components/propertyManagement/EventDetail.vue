<template>
  <div>
    <v-card class="pa-4 mt-2">
      <v-toolbar-title class="grey--text mb-2">Renew Date</v-toolbar-title>
      <!-- 保险续约 -->
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
            v-model="propertyDetail.insuranceExpiryReminders"
            label="Remind renew insurance date"
            hint="MM/DD/YYYY"
            persistent-hint
            prepend-icon="mdi-calendar"
            v-on="on"
            :readonly="readonly"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="insuranceExpiryReminders"
          no-title
          @input="menu1 = true"
          v-if="!readonly"
        >
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
            v-model="propertyDetail.adjustRentReminders"
            label="Remind adjust rent"
            hint="MM/DD/YYYY"
            persistent-hint
            prepend-icon="mdi-calendar"
            v-on="on"
            :readonly="readonly"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="adjustRentReminders"
          no-title
          @input="menu2 = true"
          v-if="!readonly"
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
        :clearable="clearable"
        dense
        prepend-icon="mdi-account"
        v-model="propertyDetail.weCompany"
        :readonly="readonly"
      ></v-text-field>
      <v-text-field
        label="phone"
        placeholder="Placeholder"
        outlined
        :clearable="clearable"
        dense
        prepend-icon="mdi-phone"
        v-model="propertyDetail.weCompanyTel"
        :readonly="readonly"
      ></v-text-field>
    </v-card>
    <v-card class="pa-4 mt-2">
      <v-toolbar-title class="grey--text mb-2">热水炉</v-toolbar-title>
      <v-text-field
        label="公司名称"
        placeholder="Placeholder"
        outlined
        :clearable="clearable"
        dense
        prepend-icon="mdi-account"
        v-model="propertyDetail.whCompany"
        :readonly="readonly"
      ></v-text-field>
      <v-text-field
        label="phone"
        placeholder="Placeholder"
        outlined
        :clearable="clearable"
        dense
        prepend-icon="mdi-phone"
        v-model="propertyDetail.whCompanyTel"
        :readonly="readonly"
      ></v-text-field>
    </v-card>
    <v-card class="pa-4 mt-2">
      <v-toolbar-title class="grey--text mb-2">暖气炉</v-toolbar-title>
      <v-text-field
        label="公司名称"
        placeholder="Placeholder"
        outlined
        :clearable="clearable"
        dense
        prepend-icon="mdi-account"
        v-model="propertyDetail.hfCompany"
        :readonly="readonly"
      ></v-text-field>
      <v-text-field
        label="phone"
        placeholder="Placeholder"
        outlined
        :clearable="clearable"
        dense
        prepend-icon="mdi-phone"
        v-model="propertyDetail.hfCompanyTel"
        :readonly="readonly"
      ></v-text-field>
    </v-card>
    <v-row class="mt-3" v-if="!readonly">
      <v-col cols="12" align="center">
        <v-btn color="primary" width="70%" @click="save()">save</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Moment from "moment";
export default {
  props: {
    property: Object,
    startDate: String,
    endDate: String,
    tenants: Array,
    propertyDetail: Object,
    readonly: Boolean,
    clearable: Boolean,
  },
  data: (vm) => ({
    insuranceExpiryReminders: new Date().toISOString().substr(0, 10),
    insuranceExpiryRemindersFormatted: vm.formatDate(
      new Date().toISOString().substr(0, 10)
    ),
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
    insuranceExpiryReminders: {
      handler: function() {
        const [year, month, day] = this.insuranceExpiryReminders.split("-");
        this.propertyDetail.insuranceExpiryReminders = `${month}/${day}/${year}`;
      },
    },

    adjustRentReminders: {
      handler: function() {
        const [year, month, day] = this.adjustRentReminders.split("-");
        this.propertyDetail.adjustRentReminders = `${month}/${day}/${year}`;
      },
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    async save() {
      console.log(this.propertyDetail);
      try {
        let insuranceExp = Date.parse(this.propertyDetail.insuranceExpiryDate);
        console.log(this.propertyDetail.insuranceExpiryDate);
        let renewStamp = Date.parse(
          this.propertyDetail.insuranceExpiryReminders
        );
        let rentStamp = Date.parse(this.propertyDetail.adjustRentReminders);
        let startStamp = Date.parse(this.startDate);
        let endStamp = Date.parse(this.endDate);
        console.log();
        await this.$axios.put(
          `/api/properties/${this.$route.query.id}`,
          {
            city: this.propertyDetail.city,
            region: this.propertyDetail.region,
            address: this.propertyDetail.address,
            startTime: startStamp,
            endTime: endStamp,
            insuranceNo: this.propertyDetail.insuranceNo,
            insuranceExpiryDate: insuranceExp,
            // 续约保险提醒日期
            insuranceExpiryReminders: renewStamp.toString(),
            // 租金调整日期
            adjustRentReminders: rentStamp.toString(),
            weCompany: this.propertyDetail.weCompany,
            weCompanyTel: this.propertyDetail.weCompanyTel,
            whCompany: this.propertyDetail.whCompany,
            whCompanyTel: this.propertyDetail.whCompanyTel,
            hfCompany: this.propertyDetail.hfCompany,
            hfCompanyTel: this.propertyDetail.hfCompanyTel,
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
    },
  },
};
</script>

<style></style>
