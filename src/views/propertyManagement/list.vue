<template>
  <v-container fluid>
    <v-card class=" pa-4 mx-auto" max-width="600">
      <v-toolbar-title class="subtitle-1 font-weight-medium	"
        >Up Coming Events</v-toolbar-title
      >
      <v-expansion-panels class="mt-2" focusable tile dense>
        <v-expansion-panel v-for="(item, i) in upComingEvent" :key="i">
          <v-expansion-panel-header>{{
            item.address
          }}</v-expansion-panel-header>
          <v-expansion-panel-content class="pt-2">
            <!-- <v-list>
              <v-list-item v-for="(e, i) in item.events" :key="i" dense="">
                <v-row>
                  <v-col cols="8">{{ e.event }}</v-col>
                  <v-col cols="4" align="center">{{ e.date }}</v-col>
                  <v-col cols="12" align="right"> </v-col>
                  <v-col cols="12" class="pa-0"><v-divider></v-divider></v-col>
                </v-row>
              </v-list-item>
            </v-list> -->
            <v-list dense>
              <v-list-item-group color="primary">
                <v-list-item
                  v-for="(e, i) in item.events"
                  :key="i"
                  dense=""
                  style="padding: 0;"
                >
                  <v-list-item-content>
                    <v-row>
                      <v-col cols="8">{{ e.event }}</v-col>
                      <v-col cols="4" align="center">{{ e.date }}</v-col>
                      <v-col cols="12" align="right"> </v-col>
                      <v-col cols="12" class="pa-0"
                        ><v-divider></v-divider
                      ></v-col>
                    </v-row>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-expansion-panel-content>
          <v-expansion-panel-content>
            <v-row no-gutters="">
              <v-col cols="12" align="right">
                <v-menu top>
                  <template v-slot:activator="{ on }">
                    <v-icon left color="primary" v-on="on"
                      >mdi-pencil-outline</v-icon
                    >
                  </template>
                  <v-list>
                    <v-list-item v-for="(item, index) in items" :key="index">
                      <v-list-item-title @click="click(index)">{{
                        item.title
                      }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "PropertyManagement",
  title: "Property Management",
  path: "/propertymanagement",
  layout: "identity",
  data() {
    return {
      on: "",
      upComingEvent: [
        {
          address: "8130 birchmount rd",
          events: [
            {
              event: "Remind renew date",
              date: "2020/2/1"
            },
            {
              event: "Rent increase notice",
              date: "2020/4/1"
            }
          ]
        },
        {
          address: "25 town center ct",
          events: [
            {
              event: "每月收租",
              date: "2020/4/2"
            },
            {
              event: "租客保险跟新",
              date: "2020/6/1"
            }
          ]
        },
        {
          address: "135 village green sq",
          events: [
            {
              event: "Remind renew date",
              date: "2020/2/1"
            },
            {
              event: "Rent increase notice",
              date: "2020/4/1"
            },
            {
              event: "每月收租",
              date: "2020/4/2"
            },
            {
              event: "租客保险跟新",
              date: "2020/6/1"
            }
          ]
        }
      ],
      items: [
        { title: "Edit" },
        { title: "See Detail" },
        { title: "Terminate" },
        { title: "续约" }
      ]
    };
  },
  methods: {
    click(i) {
      console.log(i);
    }
  }
};
</script>

<style scoped></style>
