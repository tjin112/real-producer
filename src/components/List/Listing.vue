<template>
  <v-expansion-panels flat >
    <v-expansion-panel>
      <v-expansion-panel-header style="background:#dddddd">Current Listing </v-expansion-panel-header>
      <v-expansion-panel-content class="pt-4">
        <v-card
          class="mb-1 pa-4 mx-auto"
          max-width="600"
          v-for="(item, index) in futureShowing"
          :key="index"
        >
          <v-expand-x-transition>
            <v-row>
              <v-col cols="7">
                <v-img src="https://picsum.photos/510/300?random"></v-img>
              </v-col>
              <v-col cols="5"
                ><p class="ma-0 hide">{{ item.address }}</p>
                <p class="ma-0">${{ item.price }}</p>
                <p class="ma-0">{{ item.mls }}</p>
                <p class="red--text ma-0">{{ item.status }}</p></v-col
              >
              <v-col cols="11" class="pa-0 mx-auto"
                ><v-divider></v-divider
              ></v-col>
            </v-row>
          </v-expand-x-transition>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  data() {
    return {
      futureShowing: [
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
    };
  }
};
</script>

<style scoped>
.hide {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
