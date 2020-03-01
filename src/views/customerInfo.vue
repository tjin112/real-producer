<template>
  <v-container fluid>
    <v-card class="pl-8 pr-8 pt-6 pb-6 mx-auto" max-width="600">
      <v-row no-gutters>
        <v-col cols="4">
          <v-icon size="64" color="primary">mdi-account-circle</v-icon>
          <p style="color:rgba(0, 0, 0, 0.54);text">Taimin Jin</p>
        </v-col>
        <v-col cols="8">
          <v-list dense class="pa-0">
            <v-list-item v-for="(item, i) in items" :key="i">
              <v-list-item-icon>
                <v-icon v-text="item.icon" :color="item.color"></v-icon>
              </v-list-item-icon>
              <v-list-item-content class="pa-0">
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="12">
          <v-textarea
            v-model="notes"
            name="input-7-1"
            label="Note:"
            auto-grow
            rows="1"
            validate-on-blur
            @blur="blur"
            outlined
          ></v-textarea>
        </v-col>
      </v-row>
    </v-card>
    <v-card class="mt-4 pa-4 mx-auto" max-width="600">
      <v-toolbar-title class="subtitle-1 font-weight-medium	"
        >Future Showing</v-toolbar-title
      >
      <v-expansion-panels class="mt-2" focusable>
        <v-expansion-panel v-for="(item, i) in futureShowing" :key="i">
          <v-expansion-panel-header>{{ item.day }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col cols="8">{{ item.address }}</v-col>
              <v-col cols="4">${{ item.price }}</v-col>
              <v-col cols="12" class="pa-0"><v-divider></v-divider></v-col>
              <v-col cols="8">{{ item.mls }}</v-col>
              <v-col cols="4" class="red--text">{{ item.status }}</v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
    <v-card class="mt-4 pa-4 mx-auto" max-width="600">
      <v-toolbar-title class="subtitle-1 font-weight-medium	"
        >Showing History</v-toolbar-title
      >
      <v-expansion-panels class="mt-2" focusable>
        <v-expansion-panel v-for="(item, i) in futureShowing" :key="i">
          <v-expansion-panel-header>{{ item.day }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col cols="8">{{ item.address }}</v-col>
              <v-col cols="4">${{ item.price }}</v-col>
              <v-col cols="12" class="pa-0"><v-divider></v-divider></v-col>
              <v-col cols="8">{{ item.mls }}</v-col>
              <v-col cols="4" class="red--text">{{ item.status }}</v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
    <v-card class="mt-4 pa-4 mx-auto" max-width="600">
      <v-toolbar-title class="subtitle-1 font-weight-medium	"
        >Listing</v-toolbar-title
      >
      <v-expansion-panels class="mt-2" focusable>
        <v-expansion-panel v-for="(item, i) in futureShowing" :key="i">
          <v-expansion-panel-header>{{ item.day }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col cols="8">{{ item.address }}</v-col>
              <v-col cols="4">${{ item.price }}</v-col>
              <v-col cols="12" class="pa-0"><v-divider></v-divider></v-col>
              <v-col cols="8">{{ item.mls }}</v-col>
              <v-col cols="4" class="red--text">{{ item.status }}</v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "CustomerInfo",
  title: "Customer Information",
  path: "/customerInfo",
  layout: "identity",
  data: () => ({
    item: 1,
    items: [
      { text: "6479793401", icon: "mdi-cellphone", color: "red" },
      { text: "940986798@qq.com", icon: "mdi-email", color: "teal" },
      { text: "Conversions", icon: "mdi-tag", color: "primary" }
    ],
    notes: "",
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
  }),
  methods: {
    blur() {
      console.log("我失去了焦点");
    }
  }
};
</script>

<style></style>
