<template>
  <v-container fluid>
    <div v-if="complete">正在加载</div>
    <!-- 客户基本信息 -->
    <div v-else>
      <div v-if="edit">
        <v-card class="pl-8 pr-8 pt-6 pb-6 mx-auto" max-width="600">
          <v-row no-gutters>
            <v-col cols="12" class="d-flex justify-center mb-3">
              <v-icon size="64" color="primary">mdi-account-circle</v-icon>
            </v-col>
            <v-col cols="12" class=" h6 d-flex justify-center">
              <p class="font-weight-medium subtitle-1">
                {{ customerInfo.firstName }} {{ customerInfo.lastName }}
              </p>
            </v-col>
            <v-col cols="12" class="d-flex justify-end">
              <v-btn color="primary" x-small="" @click="editor()">Edit</v-btn>
            </v-col>
            <v-col cols="12" class="overline">Basic Infomaition</v-col>
            <v-col cols="12" class="mb-2"> <v-divider></v-divider></v-col>

            <v-col cols="12">
              <v-list dense class="pa-0">
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="red">mdi-cellphone</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content class="pa-0">
                    <v-list-item-title
                      v-text="customerInfo.telephone || '未登记'"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="teal">mdi-email</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content class="pa-0">
                    <v-list-item-title
                      v-text="customerInfo.email || '未登记'"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item class="d-flex flex-wrap">
                  <v-list-item-icon>
                    <v-icon color="primary">mdi-tag</v-icon>
                  </v-list-item-icon>
                  <div
                    class="pa-0"
                    v-for="(item, index) in customerInfo.tags"
                    :key="index"
                  >
                    <v-chip small class="mr-2">{{ item }}</v-chip>
                  </div>
                </v-list-item>
                <div class="overline mt-2">Other Infomaition</div>
                <v-divider class="mb-2"></v-divider>
                <!-- 其他信息 有则显示-->
                <!-- 紧急联系人 -->
                <v-list-item v-if="customerInfo.emergencyContact">
                  <v-list-item-content>
                    <v-list-item-subtitle class="overline"
                      >Emergency Contact</v-list-item-subtitle
                    >
                    <v-list-item-title>{{
                      customerInfo.emergencyContact
                    }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item v-if="customerInfo.familyTel">
                  <v-list-item-content>
                    <v-list-item-subtitle class="overline"
                      >Family Tel</v-list-item-subtitle
                    >
                    <v-list-item-title>{{
                      customerInfo.familyTel
                    }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item v-if="customerInfo.spouseTel">
                  <v-list-item-content>
                    <v-list-item-subtitle class="overline"
                      >spouse Tel</v-list-item-subtitle
                    >
                    <v-list-item-title>{{
                      customerInfo.spouseTel
                    }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item v-if="customerInfo.workAddress">
                  <v-list-item-content>
                    <v-list-item-subtitle class="overline"
                      >work Address</v-list-item-subtitle
                    >
                    <v-list-item-title>{{
                      customerInfo.workAddress
                    }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
            <v-col cols="12" class="mt-5">
              <v-textarea
                v-model="note"
                :value="note"
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
        <!-- 房屋信息 -->
        <v-card class="mt-4 pa-4 mx-auto" max-width="600">
          <v-toolbar-title class="subtitle-1 font-weight-medium	"
            >Future Showing</v-toolbar-title
          >
          <v-expansion-panels class="mt-2" focusable>
            <v-expansion-panel v-for="(item, i) in futureShowing" :key="i">
              <v-expansion-panel-header>{{
                item.day
              }}</v-expansion-panel-header>
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
              <v-expansion-panel-header>{{
                item.day
              }}</v-expansion-panel-header>
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
              <v-expansion-panel-header>{{
                item.day
              }}</v-expansion-panel-header>
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
      </div>
      <!-- 编辑客户信息 -->
      <div v-else>
        <v-card class="pa-4 mx-auto" max-width="600">
          <div class=" d-flex justify-end">
            <v-btn class="mx-2" fab x-small color="white" @click="editor()">
              <v-icon>mdi-minus</v-icon>
            </v-btn>
          </div>
          <v-subheader class="pa-0">主要联系方式：</v-subheader>
          <v-row no-gutters="">
            <v-col cols="12" class="mb-2">
              <v-text-field
                v-model="customerInfo.firstName"
                label="First name"
                clearable
                dense
                :rules="[rules.required]"
                maxlength="20"
                prepend-icon="mdi-account"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="mb-2">
              <v-text-field
                v-model="customerInfo.lastName"
                label="Last name"
                clearable
                dense
                :rules="[rules.required]"
                maxlength="20"
                prepend-icon="mdi-account"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="mb-2">
              <v-text-field
                v-model="customerInfo.email"
                label="Email:"
                clearable
                dense
                :rules="[rules.email]"
                prepend-icon="mdi-email"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="mb-2">
              <v-text-field
                v-model="customerInfo.telephone"
                label="Phone:"
                clearable
                dense
                prepend-icon="mdi-phone"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="mb-2">
              <v-text-field
                v-model="customerInfo.familyTel"
                label="Home:"
                clearable
                dense
                prepend-icon="mdi-home"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
        <v-card class="pa-4 mx-auto mt-4" max-width="600">
          <v-subheader class="pa-0">others：</v-subheader>
          <v-row no-gutters="">
            <v-col cols="12">
              <v-text-field
                v-model="customerInfo.spouseTel"
                label="配偶电话:"
                dense
                prepend-icon="mdi-home-account"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="customerInfo.emergencyContact"
                label="紧急联系人:"
                dense
                prepend-icon="mdi-car-brake-alert"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="customerInfo.workAddress"
                label="工作地址:"
                dense
                prepend-icon="mdi-briefcase"
              ></v-text-field>
            </v-col>
            <v-combobox
              v-model="chips"
              :items="tags"
              chips
              clearable
              label="Your favorite hobbies"
              multiple
              prepend-icon="mdi-tag-outline"
              solo
            >
              <template v-slot:selection="{ attrs, item, select, selected }">
                <v-chip
                  v-bind="attrs"
                  :input-value="selected"
                  close
                  @click="select"
                  @click:close="remove(item)"
                >
                  <strong>{{ item }}</strong
                  >&nbsp;
                </v-chip>
              </template>
            </v-combobox>
            <v-col cols="12">
              <v-text-field
                v-model="customerInfo.note"
                label="Note:"
                dense
                prepend-icon="mdi-note"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-btn @click="submitEdit" :loading="loading">提交修改</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "CustomerInfo",
  title: "Customer Information",
  path: "/customerInfo",
  layout: "identity",
  data: () => ({
    id: "",
    customerInfo: "",
    tags: "",
    complete: true,
    edit: true,
    loading: false,
    item: 1,
    chips: "",
    rules: {
      required: (value) => !!value || "Required.",
      email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
    },
    notes: "",
    futureShowing: [
      {
        day: "Jan 2 2020",
        address: "8130 birchmount rd",
        price: "1000000",
        mls: "n123456",
        status: "new",
      },
      {
        day: "Jan 3 2020",
        address: "25 town center ct",
        price: "2000000",
        mls: "n23457",
        status: "new",
      },
    ],
  }),
  mounted() {
    let self = this;
    this.id = self.$route.query.id;
    console.log(self.$route);
    this.getCustomerInfo();
    this.getTags();
  },
  methods: {
    async getCustomerInfo() {
      try {
        await this.$axios
          .get(`/api/customers/${this.$route.query.id}`, {
            headers: {
              Authorization: sessionStorage.getItem("auth"),
            },
          })
          .then((res) => {
            this.complete = false;
            this.customerInfo = res.data;
            // console.log(this.customerInfo);
            this.chips = this.customerInfo.tags;
            this.note = this.customerInfo.note;
            this.customerInfo.firstName = this.customerInfo.firstName.replace(
              this.customerInfo.firstName[0],
              this.customerInfo.firstName[0].toUpperCase()
            );
            this.customerInfo.lastName = this.customerInfo.lastName.replace(
              this.customerInfo.lastName[0],
              this.customerInfo.lastName[0].toUpperCase()
            );
            this.loading = false;
            this.edit = true;
          });
      } catch (e) {
        console.log(e);
      }
    },
    blur() {
      console.log(this.note);
    },
    editor() {
      if (this.edit) {
        this.edit = false;
      } else {
        this.edit = true;
      }
    },
    async getTags() {
      try {
        await this.$axios
          .get("/api/tags", {
            headers: {
              Authorization: sessionStorage.getItem("auth"),
            },
          })
          .then((res) => {
            this.tags = res.data;
            this.tags = this.tags.map((item) => {
              return item.name;
            });
          });
      } catch (err) {
        console.error(err);
      }
    },
    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1);
      this.chips = [...this.chips];
    },
    async submitTags() {
      try {
        await this.$axios.put(
          `/api/customers/${this.id}/tags`,
          { tags: this.chips },
          {
            headers: {
              Authorization: this.$store.state.Identity.auth
                ? this.$store.state.Identity.auth
                : JSON.parse(localStorage.getItem("token")),
            },
          }
        );
      } catch (e) {
        console.log(e);
      }
    },
    async submitEdit() {
      this.loading = true;

      try {
        let editedInfo = this.customerInfo;
        await this.$axios.put(
          `/api/customers/${this.id}/tags`,
          { tags: this.chips },
          {
            headers: {
              Authorization: this.$store.state.Identity.auth
                ? this.$store.state.Identity.auth
                : JSON.parse(localStorage.getItem("token")),
            },
          }
        );
        // delete editedInfo.tags;
        await this.$axios
          .put(`/api/customers/${this.id}`, editedInfo, {
            headers: {
              Authorization: this.$store.state.Identity.auth
                ? this.$store.state.Identity.auth
                : JSON.parse(localStorage.getItem("token")),
            },
          })
          .then(() => {
            this.getCustomerInfo();
          });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style></style>
