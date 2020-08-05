<template>
  <v-container fluid>
    <v-card class=" pa-4 mx-auto" max-width="600">
      <v-toolbar-title class="subtitle-1 font-weight-medium	"
        >Up Coming Events</v-toolbar-title
      >
      <v-expansion-panels class="mt-2" focusable tile dense>
        <v-expansion-panel v-for="(item, i) in upComingEvent" :key="i">
          <v-expansion-panel-header
            >{{ item.customerFirstName }}
            {{ item.customerLastName }}</v-expansion-panel-header
          >
          <v-expansion-panel-content class="pt-2">
            <v-list dense>
              <v-list-item-group color="primary">
                <v-list-item style="padding: 0;">
                  <v-list-item-content>
                    <v-row>
                      <v-col cols="6">租金调整时间</v-col>
                      <v-col cols="6" align="right">{{
                        item.adjustRentReminders
                      }}</v-col>
                      <v-col cols="6">租客保险跟新</v-col>
                      <v-col cols="6" align="right">{{
                        item.insuranceExpiryReminders
                      }}</v-col>
                      <v-col cols="12" class="pa-0"
                        ><v-divider></v-divider
                      ></v-col>

                      <v-col cols="12" align="right">
                        <v-menu top>
                          <template v-slot:activator="{ on }">
                            <v-icon left color="primary" v-on="on"
                              >mdi-pencil-outline</v-icon
                            >
                          </template>
                          <v-list>
                            <v-list-item
                              v-for="(e, index) in items"
                              :key="index"
                            >
                              <v-list-item-title
                                @click="click(index, item.id)"
                                >{{ e.title }}</v-list-item-title
                              >
                            </v-list-item>
                          </v-list>
                        </v-menu>
                      </v-col>
                    </v-row>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </v-container>
</template>

<script>
import Moment from "moment";
export default {
  name: "PropertyManagement",
  title: "Property Management",
  path: "/propertymanagement",
  layout: "identity",
  data() {
    return {
      on: "",
      id: "",
      upComingEvent: [],
      // {
      //   address: "8130 birchmount rd",
      //   events: [
      //     {
      //       event: "Remind renew date",
      //       date: "2020/2/1",
      //     },
      //     {
      //       event: "Rent increase notice",
      //       date: "2020/4/1",
      //     },
      //   ],
      // },

      items: [
        { title: "Edit" },
        { title: "See Detail" },
        { title: "Terminate" },
        { title: "续约" },
      ],
    };
  },
  mounted() {
    this.id = 1;
    this.loadEvent();
  },
  methods: {
    click(i, id) {
      if (i === 1) {
        console.log(id);
        this.$router.push({ path: "/propertydetail", query: { id: id } });
      }
    },
    async loadEvent() {
      var timeStamp = new Date(new Date().setHours(0, 0, 0, 0)) / 1000;
      const properties = await this.$axios.get("/api/properties", {
        headers: {
          Authorization: sessionStorage.getItem("auth"),
        },
      });
      properties.data.results.map((item, index) => {
        var currentTime = Date.parse(new Date()) / 1000;
        var threeDaysLater = currentTime + 86400 * 4;
        if (
          item.adjustRentReminders / 1000 > currentTime &&
          threeDaysLater > item.adjustRentReminders / 1000
        ) {
          var ts = Number(item.adjustRentReminders) + 14400000 * 4;
          item.adjustRentReminders = new Date(ts);
          item.adjustRentReminders = Moment(item.adjustRentReminders).format(
            "M/D/YYYY"
          );
          var ts1 = Number(item.insuranceExpiryReminders) + 14400000 * 4;
          item.insuranceExpiryReminders = new Date(ts1);
          item.insuranceExpiryReminders = Moment(
            item.insuranceExpiryReminders
          ).format("M/D/YYYY");
          this.upComingEvent.push(item);
        }
      });
      console.log(this.upComingEvent);

      // let time = Number(test.data.results[0].adjustRentReminders);
      // var g = time - 86400000 ; //定义一个时间戳变量
      // var d = new Date(g); //创建一个指定的日期对象
      // console.log(d);
      // // console.log(formatDate(d));
      // console.log(new Date(test.data.results[0].adjustRentReminders));
    },
  },
};
</script>

<style scoped></style>
