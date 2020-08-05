<template>
  <v-container fluid>
    <v-card class="pa-4">
      <v-toolbar-title class="grey--text mb-2">房东信息</v-toolbar-title>
      <v-text-field
        label="房东"
        placeholder="Placeholder"
        outlined
        :clearable="clearable"
        dense
        prepend-icon="mdi-account"
        v-model="fullName"
        :readonly="readonly"
      ></v-text-field>
      <v-text-field
        label="地址"
        placeholder="Placeholder"
        outlined
        :clearable="clearable"
        dense
        prepend-icon="mdi-home"
        v-model="propertyDetail.address"
        :readonly="readonly"
      ></v-text-field>
      <v-text-field
        label="region"
        placeholder="Placeholder"
        outlined
        :clearable="clearable"
        dense
        v-model="propertyDetail.region"
        :readonly="readonly"
      ></v-text-field>
      <v-text-field
        label="city"
        placeholder="Placeholder"
        outlined
        :clearable="clearable"
        dense
        v-model="propertyDetail.city"
        :readonly="readonly"
      ></v-text-field>
      <!-- 开始时间 -->
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
            :readonly="readonly"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="startDate"
          no-title
          @input="menu1 = true"
          v-if="!readonly"
        >
        </v-date-picker>
      </v-menu>
      <!-- 结束时间 -->
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
            :readonly="readonly"
          ></v-text-field>
        </template>
        <v-date-picker v-model="endDate" no-title v-if="!readonly">
        </v-date-picker>
      </v-menu>
    </v-card>
    <!-- 租客信息 -->
    <v-card class="pa-4 mt-2">
      <v-toolbar-title class="grey--text mb-2">Resident</v-toolbar-title>
      <div v-for="(e, i) in propertyDetail.tenants" :key="i">
        <v-text-field
          label="Resident name"
          placeholder="name"
          outlined
          :clearable="clearable"
          dense
          prepend-icon="mdi-account"
          v-model="e.name"
          :readonly="readonly"
        ></v-text-field>
        <v-text-field
          label="phone"
          placeholder="Placeholder"
          outlined
          :clearable="clearable"
          dense
          prepend-icon="mdi-phone"
          v-model="e.telephone"
          :readonly="readonly"
        ></v-text-field>
        <v-text-field
          label="email"
          placeholder="Placeholder"
          outlined
          :clearable="clearable"
          dense
          prepend-icon="mdi-email"
          v-model="e.email"
          :readonly="readonly"
        ></v-text-field>
      </div>
      <v-text-field
        label="保险号码"
        placeholder="MM/DD/YY"
        outlined
        :clearable="clearable"
        dense
        prepend-icon="mdi-star-outline"
        v-model="propertyDetail.insuranceNo"
        :readonly="readonly"
      ></v-text-field>
      <v-menu
        ref="menu3"
        v-model="menu3"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="insuranceExpDateFormatted"
            label="租客保险到期日"
            hint="MM/DD/YYYY"
            persistent-hint
            prepend-icon="mdi-calendar"
            v-on="on"
            :readonly="readonly"
          ></v-text-field>
        </template>
        <v-date-picker v-model="insuranceExpDate" no-title v-if="!readonly">
        </v-date-picker>
      </v-menu>
    </v-card>
    <EventDetail
      :property="property"
      :startDate="startFormatted"
      :endDate="endFormatted"
      :tenants="tenants"
      :propertyDetail="propertyDetail"
      :readonly="readonly"
      :clearable="clearable"
    />
    <!-- 底部按钮 -->
    <v-speed-dial
      fixed=""
      v-model="fab"
      :bottom="bottom"
      :right="right"
      :direction="direction"
      transition="slide-y-reverse-transition"
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="blue darken-2" dark fab>
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-account-circle</v-icon>
        </v-btn>
      </template>
      <v-btn fab dark small color="green" @click="edit()">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn fab dark small color="indigo">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn fab dark small color="red">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-speed-dial>
    <!-- 进入编辑模式提醒 -->
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      top=""
      color="grey darken-1"
    >
      {{ text }}

      <v-btn
        color="red darken-1"
        text
        @click="
          snackbar = false;
          readonly = true;
          clearable = false;
        "
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import EventDetail from "@/components/propertyManagement/EventDetail";
import Moment from "moment";
export default {
  name: "PropertyDetail",
  title: "Property Detailt",
  path: "/propertydetail",
  layout: "identity",
  components: {
    EventDetail,
  },
  data: (vm) => ({
    startDate: new Date().toISOString().substr(0, 10),
    endDate: new Date().toISOString().substr(0, 10),
    insuranceExpDate: new Date().toISOString().substr(0, 10),
    startFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    endFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    insuranceExpDateFormatted: vm.formatDate(
      new Date().toISOString().substr(0, 10)
    ),
    menu1: false,
    menu2: false,
    menu3: false,
    notes: null,
    property: {
      landlord: "",
      address: "",
      region: "",
      city: "",
    },
    tenants: [
      {
        name: "",
        telephone: "",
        email: "",
        insurance: "",
        insuranceExp: "",
      },
    ],
    id: "",
    propertyDetail: {
      tenants: [{ name: "" }, { telephone: "" }, { email: "" }],
    },
    readonly: true,
    clearable: false,
    fullName: "",
    // ====
    direction: "top",
    fab: false,
    fling: false,
    hover: false,
    tabs: null,
    right: true,
    bottom: true,
    transition: "slide-y-reverse-transition",
    // ====
    snackbar: false,
    text: "You are now in the edit mode",
    vertical: true,
    timeout: 0,
  }),

  watch: {
    startDate() {
      this.startFormatted = this.formatDate(this.startDate);
    },
    endDate() {
      this.endFormatted = this.formatDate(this.endDate);
    },
    insuranceExpDate() {
      this.insuranceExpDateFormatted = this.formatDate(this.insuranceExpDate);
      this.propertyDetail.insuranceExpiryDate = this.insuranceExpDateFormatted;
      console.log("保险过期日：" + this.insuranceExpDateFormatted);
    },
  },
  mounted() {
    this.getPropertyDetail();
  },
  methods: {
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    format(date) {
      var startTime = Number(date) + 14400000 * 4;
      date = new Date(startTime);
      return date;
    },
    getPropertyDetail() {
      try {
        this.$axios
          .get(`/api/properties/${this.$route.query.id}`, {
            headers: {
              Authorization: sessionStorage.getItem("auth"),
            },
          })
          .then((res) => {
            console.log(res.data);
            this.propertyDetail = res.data;
            this.fullName =
              this.propertyDetail.customerFirstName +
              " " +
              this.propertyDetail.customerLastName;
            //   START TIME
            var startTime = this.format(this.propertyDetail.startTime);
            this.startFormatted = Moment(startTime).format("M/D/YYYY");

            this.propertyDetail.startTime = this.startFormatted;

            // END TIME
            var endTime = this.format(this.propertyDetail.endTime);
            this.endFormatted = Moment(endTime).format("M/D/YYYY");
            this.propertyDetail.endTime = this.endFormatted;
            // 保险过期日
            var insuranceDate = this.format(
              this.propertyDetail.insuranceExpiryDate
            );
            this.insuranceExpDateFormatted = Moment(insuranceDate).format(
              "M/D/YYYY"
            );
            this.propertyDetail.insuranceExpiryDate = Moment(
              insuranceDate
            ).format("M/D/YYYY");

            // 保险renew提醒
            var insuranceExpiryReminders = this.format(
              this.propertyDetail.insuranceExpiryReminders
            );

            this.propertyDetail.insuranceExpiryReminders = Moment(
              insuranceExpiryReminders
            ).format("M/D/YYYY");
            // 租金调整日
            var adjustRent = this.format(
              this.propertyDetail.adjustRentReminders
            );
            this.propertyDetail.adjustRentReminders = Moment(adjustRent).format(
              "M/D/YYYY"
            );
          });
      } catch (e) {
        console.log(e);
      }
    },
    edit() {
      this.readonly = false;
      this.snackbar = true;
      this.clearable = true;
      console.log("edit");
    },
  },
};
</script>

<style></style>
