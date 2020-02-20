<template>
  <v-app>
    <v-app-bar color="primary" absolute app dark dense>
      <v-row no-gutters cols="12">
        <v-col cols="1">
          <v-btn icon @click="$router.go(-1)">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="10" style="margin: auto">
          <v-toolbar-title class="subtitle-1 d-flex justify-center text-center">Real Producer</v-toolbar-title>
        </v-col>
          <v-col cols="1">
         
        </v-col>
      </v-row>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "IdentityLayout"
};
</script>
<style scoped>
.test{
 margin: 0 auto !important;
}
</style>
