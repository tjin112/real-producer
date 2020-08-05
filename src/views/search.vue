<template>
  <v-app>
    <v-app-bar app hide-on-scroll>
      <v-btn color="teal" icon @click="$router.go(-1)">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-text-field
        v-model="params.name"
        class="ma-0 pa-0"
        color="teal"
        label="搜索"
        clearable
        dense
        hide-details
        single-line
      >
      </v-text-field>
      <v-btn color="teal" icon @click="search">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <v-list
          v-if="products instanceof Array && products.length > 0"
          three-line
          style="height:100px"
        >
          <template v-for="(product, index) in products">
            <v-list-item :key="product.id">
              <v-list-item-action class="mr-3">
                <v-img
                  width="120"
                  height="60"
                  :src="`//${product.cover}`"
                ></v-img>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ product.name }}</v-list-item-title>
                <v-list-item-subtitle class="teal--text">{{
                  `￥${product.price}`
                }}</v-list-item-subtitle>
                <v-list-item-subtitle
                  v-html="
                    `销量 <span style='color:#009688'>${product.sales}</span>    库存 <span style='color:#009688'>${product.stocks}</span>`
                  "
                ></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider
              v-if="index + 1 < products.length"
              :key="index"
            ></v-divider>
          </template>
        </v-list>
        <v-card v-else>
          <v-row class="pa-2" dense>
            <v-col cols="12">历史查询</v-col>
            <v-col>
              <v-chip
                v-for="(item, index) in searchs"
                :key="index"
                class="ma-1"
                label
                @click="searchHistory(item)"
              >
                {{ item }}
              </v-chip>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "Search",
  path: "/search",
  layout: "none",
  data() {
    return {
      params: {
        name: this.$route.query.keyword,
        pageIndex: 1,
        pageSize: 20
      },
      maxPage: 0,
      searchs: this.$store.getters.search,
      products: []
    };
  },
  mounted() {
    if (this.params.name) {
      this.getProducts();
    }
    window.addEventListener("scroll", () => {
      //变量scrollTop是滚动条滚动时，距离顶部的距离
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop; //变量windowHeight是可视区的高度
      var windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight; //变量scrollHeight是滚动条的总高度
      var scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight; //滚动条到底部的条件
      if (scrollTop + windowHeight == scrollHeight) {
        if (this.params.pageIndex < this.maxPage) {
          this.params.pageIndex++;
          this.appendProducts();
        } else {
          this.tip = "已没有更多商品";
        }
      }
    });
  },
  methods: {
    search() {
      // this.$store.commit("SET_SEARCH", this.params.name);
      this.getProducts();
    },
    searchHistory(keyword) {
      this.params.name = keyword;
      this.search();
    },
    async getProducts() {
      const { data: products } = await this.$axios.get("/s/products", {
        params: this.params
      });
      this.maxPage = Math.ceil(products.count / this.params.pageSize);
      this.products = products.items;
    },
    async appendProducts() {
      const { data: products } = await this.$axios.get("/s/products", {
        params: this.params
      });
      this.maxPage = Math.ceil(products.count / this.params.pageSize);
      this.products.push(...products.items);
    }
  }
};
</script>
