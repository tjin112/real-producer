<template>
  <v-container fluid>
      <!-- 正在进行的openhouse -->
    <v-card class="mt-2 pa-4 mx-auto" max-width="600">
      <v-toolbar-title class="subtitle-1 font-weight-medium	"
        >Open House</v-toolbar-title
      >
      <v-expansion-panels class="mt-2" focusable>
        <v-expansion-panel v-for="(item, i) in openHouse" :key="i">
          <v-expansion-panel-header>{{ item.day }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col cols="8">{{ item.address }}</v-col>
              <v-col cols="4">${{ item.price }}</v-col>
              <v-col cols="12" class="pa-0"><v-divider></v-divider></v-col>
              <v-col cols="8">{{ item.mls }}</v-col>
              <v-col cols="4" class="red--text">{{ item.status }}</v-col>
              <v-col cols="6" style="text-align:center"
                ><v-btn small>Details</v-btn>
              </v-col>
              <v-col cols="6" style="text-align:center"
                ><v-btn  small @click="del(i)"
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
    <!-- openhouse 历史 -->
    <v-card class="mt-4 pa-4 mx-auto" max-width="600">
      <v-toolbar-title class="subtitle-1 font-weight-medium	"
        >Open house History</v-toolbar-title
      >
      <v-expansion-panels class="mt-2" focusable>
        <v-expansion-panel v-for="(item, i) in openHouse" :key="i">
          <v-expansion-panel-header>{{ item.day }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col cols="8">{{ item.address }}</v-col>
              <v-col cols="4">${{ item.price }}</v-col>
              <v-col cols="12" class="pa-0"><v-divider></v-divider></v-col>
              <v-col cols="8">{{ item.mls }}</v-col>
              <v-col cols="4" class="red--text">{{ item.status }}</v-col>
              <v-col cols="6" style="text-align:center"
                ><v-btn small>Details</v-btn>
              </v-col>
              <v-col cols="6" style="text-align:center"
                ><v-btn small
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
  </v-container>
</template>

<script>
export default {
  name: "openHouse",
  title: "Open House",
  path: "/openhouse",
  layout: "identity",
  data: () => ({
    item: 1,
    notes: "",
    openHouse: [
      {
        day: "Jan 2 2020",
        address: "8130 birchmount rd",
        price: "1000000",
        mls: "n123456",
        status: "new"
      },
      {
        day: "Jan 3 2020",
        address: "25 town center ct",
        price: "2000000",
        mls: "n23457",
        status: "new"
      }
    ]
  }),
  methods: {
    blur() {
      console.log("我失去了焦点");
    },
    del(index) {
      this.openHouse.splice(index, 1);
    }
  }
};
</script>

<style></style>
