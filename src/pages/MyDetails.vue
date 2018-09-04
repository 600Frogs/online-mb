<template>
  <v-container grid-list-md fluid text-cs-center fill-height pt-5 pb-5>
    <v-layout justify-center>
      <v-flex elevation-6 xs9>
        <v-toolbar flat tabs>
            <v-toolbar-title>Applicant Details</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
            <v-tabs
              fixed-tabs
              slider-color="cyan"
               fluid
               color="grey lighten-3"
            >
              <v-tab ripple>
                <v-icon color="red" class="validationIcon" v-if="!userData.checkData.basicDetails">highlight_off</v-icon>
                <v-icon color="green" class="validationIcon" v-else>check_circle</v-icon>
                General
              </v-tab>
              <v-tab ripple>
                <v-icon color="red" class="validationIcon" v-if="!userData.checkData.residentialDetails">highlight_off</v-icon>
                <v-icon color="green" class="validationIcon" v-else>check_circle</v-icon>
                Residential
              </v-tab>
              <v-tab ripple>
                <v-icon color="red" class="validationIcon" v-if="!userData.checkData.employmentDetails">highlight_off</v-icon>
                <v-icon color="green" class="validationIcon" v-else>check_circle</v-icon>
                Employment
              </v-tab>
              <v-tab ripple>
                <v-icon color="red" class="validationIcon" v-if="!userData.checkData.incomeDetails">highlight_off</v-icon>
                <v-icon color="green" class="validationIcon" v-else>check_circle</v-icon>
                Income
              </v-tab>
              <v-tab ripple>
                <v-icon color="red" class="validationIcon" v-if="!userData.checkData.assetDetails">highlight_off</v-icon>
                <v-icon color="green" class="validationIcon" v-else>check_circle</v-icon>
                Assets
              </v-tab>
              <v-tab ripple>
                <v-icon color="red" class="validationIcon" v-if="!userData.checkData.liabilitiesDetails">highlight_off</v-icon>
                <v-icon color="green" class="validationIcon" v-else>check_circle</v-icon>
                Liabilities
              </v-tab>
            <v-tab-item>
              <v-card flat>
                <v-card-text><basicdetails ref="basicDetails"></basicdetails></v-card-text>
                <v-btn :loading="loading" :disabled="loading" color="secondary" @click.native="saveData">Save Data</v-btn>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-text><residentialdetails ref="residentialDetails"></residentialdetails></v-card-text>
                <v-btn :loading="loading" :disabled="loading" color="secondary" @click.native="saveData">Save Data</v-btn>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-text><employmentdetails ref="employmentDetails"></employmentdetails></v-card-text>
                <v-btn :loading="loading" :disabled="loading" color="secondary" @click.native="saveData">Save Data</v-btn>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-text><income ref="incomeDetails"></income></v-card-text>
                <v-btn :loading="loading" :disabled="loading" color="secondary" @click.native="saveData">Save Data</v-btn>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-text><assets ref="assetDetails"></assets></v-card-text>
                <v-btn :loading="loading" :disabled="loading" color="secondary" @click.native="saveData">Save Data</v-btn>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-text><liabilities ref="liabilitiesDetails"></liabilities></v-card-text>
                <v-btn :loading="loading" :disabled="loading" color="secondary" @click.native="saveData">Save Data</v-btn>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import firebase from "firebase";
import basicdetails from "@/pages/my-details/basic-details";
import residentialdetails from "@/pages/my-details/residential";
import employmentdetails from "@/pages/my-details/employment";
import income from "@/pages/my-details/income";
import assets from "@/pages/my-details/assets";
import liabilities from "@/pages/my-details/liabilities";

export default {
  name: "MyDetails",
  data() {
    return {
      loading: false,
      active: 0
    };
  },
  methods: {},
  components: {
    basicdetails,
    residentialdetails,
    employmentdetails,
    income,
    assets,
    liabilities
  },
  methods: {
    saveData: function() {
      this.loading = true;
      const vm = this;
      if (this.authenticated) {
        let data = {};
        for (let element in vm.userData) {
          data[element] = vm.userData[element];
        }
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set(data)
          .then(function(doc) {
            vm.$store.commit("snack", {
              color: "success",
              message: "Data has been saved!"
            });
            vm.checkData();
            vm.loading = false;
          })
          .catch(function(error) {
            vm.$store.commit("snack", {
              color: "error",
              message: "Sorry, an error has occured."
            });
            vm.loading = false;
          });
      } else {
        vm.$store.commit("setUserData", vm.userData);
        vm.loading = false;
      }
    },
    checkData: function() {
      const vm = this;
      vm.$refs.basicDetails.validate();
      vm.$refs.residentialDetails.validate();
      vm.$refs.employmentDetails.validate();
      vm.$refs.incomeDetails.validate();
      vm.$refs.assetDetails.validate();
      vm.$refs.liabilitiesDetails.validate();
    },
    validEmail: function(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  },
  computed: {
    authenticated() {
      return this.$store.state.authenticated;
    },
    ...mapFields(["userData", "userDataOps"])
  },
  mounted: function() {
    this.checkData();
  }
};
</script>

<style>
.application .theme--light.card,
.theme--light .card {
  background-color: #fafafa;
}
.application .theme--light.input-group:not(.input-group--error) label,
.theme--light .input-group:not(.input-group--error) label {
  color: #5f9cec;
}
.validationIcon {
  padding-right: 8px;
}
</style>
