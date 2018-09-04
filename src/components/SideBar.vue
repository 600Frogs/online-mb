<template>
  <v-navigation-drawer
   :value="drawer"
   fixed
   app
  >
   <v-list dense>
     <v-list-tile :disabled="true">
       <v-list-tile-action>
         <v-icon>home</v-icon>
       </v-list-tile-action>
       <v-list-tile-content>
         <v-list-tile-title>Get Started!</v-list-tile-title>
       </v-list-tile-content>
     </v-list-tile>
     <v-list-tile to="/" @click.native="saveData()">
       <v-list-tile-action>
         <v-icon>contact_mail</v-icon>
       </v-list-tile-action>
       <v-list-tile-content>
         <v-list-tile-title>
           My Details
           <v-icon color="red" class="validationIcon" v-if="!detailsValidated">highlight_off</v-icon>
           <v-icon color="green" class="validationIcon" v-else>check_circle</v-icon>
         </v-list-tile-title>
       </v-list-tile-content>
       </v-list-tile>
     <v-list-tile to="/home-loans" @click.native="saveData()">
       <v-list-tile-action>
         <v-icon>contact_mail</v-icon>
       </v-list-tile-action>
       <v-list-tile-content>
         <v-list-tile-title>Home Loans</v-list-tile-title>
       </v-list-tile-content>
     </v-list-tile>
     <v-list-tile to="/cost-to-purchase" @click.native="saveData()">
       <v-list-tile-action>
         <v-icon>contact_mail</v-icon>
       </v-list-tile-action>
       <v-list-tile-content>
         <v-list-tile-title>Cost to Purchase</v-list-tile-title>
       </v-list-tile-content>
     </v-list-tile>
     <v-list-tile to="/lenders" @click.native="saveData()">
       <v-list-tile-action>
         <v-icon>build</v-icon>
       </v-list-tile-action>
       <v-list-tile-content>
         <v-list-tile-title>Admin: Lenders</v-list-tile-title>
       </v-list-tile-content>
     </v-list-tile>
     <v-layout>
       <v-divider></v-divider>
     </v-layout>
     <v-layout>
       <v-flex>
         <h3>Read Me</h3>
         <p>
           App currently incomplete and not to be used for any purpose other than development.
         </p>
         <h4>What does it do?</h4>
         <p>
           A web application built using Vue.js and Google Firebase.  It can take and verify user input dynamically, check it against various home loan lenders' policies to show you what users are likely eligible for.  Max loan calculations are moderately accurate when compared to actual lender calculators and include assessment rates, tax brackets, negative gearing and living expenses based off user input.  Lender's policies and individual products can be entered under the "Lenders" screen
           (currently accessible by everyone).
         </p>
         <h4>What's not yet complete</h4>
         <p>
          Eligility filters still under development and will not filter for many inputs.  Admin tools currently accessible by everyone.  Whilst it will in future, app currently does not work on mobile and has not been tested on any resolution under 1920x1080 or any browser other than Chrome.
        </p>
        <h4>Login details for demo</h4>
        <p>Login: test@test.com<br>Pass: xxxxxx</p>
       </v-flex>
     </v-layout>
   </v-list>

  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";
import { mapFields } from "vuex-map-fields";
import firebase from "firebase";
import { createHelpers } from "vuex-map-fields";

const { mapFields: mapLenderFields } = createHelpers({
  getterType: "lenderData/getField",
  mutationType: "lenderData/updateField"
});
const { mapFields: mapUserFields } = createHelpers({
  getterType: "getField",
  mutationType: "updateField"
});

export default {
  name: "sideBar",
  data: function() {
    return {
      loading: false
    };
  },
  computed: {
    ...mapGetters({
      drawer: "getDrawerState"
    }),
    authenticated() {
      return this.$store.state.authenticated;
    },
    admin() {
      return this.$store.state.admin;
    },
    ...mapLenderFields(["lenderData", "lenderDataOps"]),
    ...mapUserFields(["userData", "userDataOps"]),
    detailsValidated() {
      if (
        this.userData.checkData.basicDetails &&
        this.userData.checkData.residentialDetails &&
        this.userData.checkData.employmentDetails &&
        this.userData.checkData.incomeDetails &&
        this.userData.checkData.assetDetails &&
        this.userData.checkData.liabilitiesDetails
      ) {
        return true;
      }
      return false;
    }
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
      if (this.admin) {
        let data = {};
        for (let element in vm.lenderData) {
          data[element] = vm.lenderData[element];
        }
        firebase
          .firestore()
          .collection("lenders")
          .doc("all")
          .set(data)
          .then(function(doc) {
            vm.loading = false;
          })
          .catch(function(error) {
            vm.$store.commit("snack", {
              color: "error",
              message: "Sorry, an error has occured."
            });
            console.log("failed!");
            vm.loading = false;
          });
      }
    }
  }
};
</script>

<style scoped>
p {
  text-align: left;
}
</style>
