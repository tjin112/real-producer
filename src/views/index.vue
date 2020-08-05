<template>
  <v-container class="overflow-y-auto" fluid>
    <v-row class="carousel" style="background:red;">
      <v-col cols="12">
        <v-carousel
          height="9rem"
          :hide-delimiters="true"
          :show-arrows="false"
          cycle
        >
          <v-carousel-item
            v-for="(item, index) in carousel"
            :key="index"
            :src="item.src"
            target="_blank"
          >
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
    <v-row class="mt-3" style="background:yellow;">
      <v-col cols="12" align="center" justify="center">热门推荐</v-col>
      <v-col cols="6">
        <v-img
          src="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
        ></v-img>
      </v-col>
      <v-col cols="6">
        <v-img
          src="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
        ></v-img>
      </v-col>
      <v-col cols="6">
        <v-img
          src="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
        ></v-img>
      </v-col>
      <v-col cols="6">
        <v-img
          src="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
        ></v-img>
      </v-col>
    </v-row>
    <v-row style="background:blue;">
      <v-col cols="12" align="center" justify="center" style="color:white;"
        >最新上架</v-col
      >
      <v-col cols="6">
        <v-img
          src="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
        ></v-img>
      </v-col>
      <v-col cols="6">
        <v-img
          src="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
        ></v-img>
      </v-col>
      <v-col cols="6">
        <v-img
          src="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
        ></v-img>
      </v-col>
      <v-col cols="6">
        <v-img
          src="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
        ></v-img>
      </v-col>
    </v-row>
    <v-row style="background:green;">
      <v-col cols="12" align="center" justify="center" style="color:white;"
        >明日方舟</v-col
      >
      <v-col cols="6">
        <v-img
          src="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
        ></v-img>
      </v-col>
      <v-col cols="6">
        <v-img
          src="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
        ></v-img>
      </v-col>
      <v-col cols="6">
        <v-img
          src="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
        ></v-img>
      </v-col>
      <v-col cols="6">
        <v-img
          src="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
        ></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Index",
  path: "/",
  data: () => ({
    carousel: [
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
        url: "//www.baidu.com"
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
        url: "https://www.baidu.com"
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
        url: "https://www.baidu.com"
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
        url: "https://www.baidu.com"
      }
    ]
  })
};
</script>
<style lang="scss" scoped>
.container {
  .row.carousel {
    margin: -12px;
  }
}
</style>
