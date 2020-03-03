<template>
  <v-container fluid>
    <v-card class="pa-4">
      <v-toolbar-title class="subtitle-1 font-weight-medium	"
        ><v-icon color="red" class="mr-2">mdi-home</v-icon> Address:
        <span> {{ this.item.address }}</span></v-toolbar-title
      >

      <v-toolbar-title class="subtitle-1 font-weight-medium	"
        ><v-icon color="primary" class="mr-3">mdi-account</v-icon>Leader:
        <span>{{ this.item.leader }}</span></v-toolbar-title
      >
      <v-toolbar-title class="subtitle-1 font-weight-medium	"
        ><v-icon color="primary" class="mr-3">mdi-account-multiple</v-icon
        >co-Leader: <span>{{ this.item.coLeader }}</span></v-toolbar-title
      >
    </v-card>
    <v-card class="mt-4 pa-4">
      <v-toolbar-title class="subtitle-1 font-weight-medium	"
        >Scheduel:</v-toolbar-title
      >
      <v-expansion-panels class="mt-2" focusable>
        <v-expansion-panel v-for="(item, i) in openHouse" :key="i">
          <v-expansion-panel-header>{{ item.day }} </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col cols="6" style="text-align:center">
                {{ item.member }}
              </v-col>
              <v-col cols="6" style="text-align:center">
                {{ item.time }}
              </v-col>
              <v-col cols="6" style="text-align:center"
                ><v-btn small>Edit</v-btn>
              </v-col>
              <v-col cols="6" style="text-align:center"
                ><v-btn small @click="del(i)"
                  ><v-icon color="red" class="float-right"
                    >mdi-delete</v-icon
                  ></v-btn
                ></v-col
              >
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
    <v-card class="mt-4 pa-4">
      <v-toolbar-title class="subtitle-1 font-weight-medium	"
        >All members:</v-toolbar-title
      >
      <v-chip
        class="ma-2"
        color="primary"
        label
        v-for="(item, i) in openHouse"
        :key="i"
      >
        <v-icon left>mdi-account-circle-outline</v-icon>
        {{ item.member }}
      </v-chip>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "openHouseDetail",
  title: "Detail",
  path: "/openhousedetail",
  layout: "identity",
  data() {
    return {
      item: {
        address: "8130 birchmount rd",
        leader: "Franz Wu",
        coLeader: "Taimin Jin" || "none"
      },
      openHouse: [
        {
          day: "Jan 2 2020",
          time: "2:00-4:00",
          member: "Donald Trump"
        },
        {
          day: "Jan 3 2020",
          time: "1:00-3:00",
          member: "Justin Trudeau "
        }
      ]
    };
  },
  methods: {
    del(index) {
      this.openHouse.splice(index, 1);
    }
  }
};
</script>

<style></style>
