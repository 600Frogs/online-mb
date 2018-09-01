<template>
  <div id="app">
    <v-app class='full-width'>
    <sideBar></sideBar>
     <topBar></topBar>
     <v-content>
       <router-view></router-view>
     </v-content>
     <v-footer app class='z-light-blue'>
       <span>&copy; 2017</span>
     </v-footer>
    </v-app>
    <snackBar></snackBar>
    <snackBar></snackBar>
  </div>
</template>

<script>
import firebase from 'firebase'
import snackBar from '@/components/SnackBar'
import sideBar from '@/components/SideBar'
import topBar from '@/components/TopBar'
import { mapGetters } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import { createHelpers } from 'vuex-map-fields'

const { mapFields: mapLenderFields } = createHelpers({
  getterType: 'lenderData/getField',
  mutationType: 'lenderData/updateField',
});
const { mapFields: mapUserFields } = createHelpers({
  getterType: 'getField',
  mutationType: 'updateField',
});

  export default {
    data: () => ({

    }),
    methods: {
      loadUserData: function() {
        var vm = this;
        if (this.authenticated) {
          ;
          firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).get().then(function(doc) {
            if (doc.exists) {
              for (var element in doc.data()) {
                vm.userData[element] = (doc.data()[element]);
              };
              console.log("Loaded!");
            } else {
                console.log("No such document!");
            }
          }).catch(function(error) {
              console.log("Error getting document:", error);
          });
        }
      },
      loadLenderData: function() {
        var vm = this;
          firebase.firestore().collection("lenders").doc("all").get().then(function(doc) {

          if (doc.exists) {
            for (var element in doc.data()) {
              vm.lenderData[element] = (doc.data()[element]);
            };
            vm.$forceUpdate();
          } else {
              console.log("No such document!");
          }
          }).catch(function(error) {
              console.log("Error getting document(s):", error);
          });
          if (vm.authenticated) {
            ;
            firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).get().then(function(doc) {
              if (doc.exists) {
                for (var element in doc.data()) {
                  vm.userData[element] = (doc.data()[element]);
                };
              } else {
                  console.log("No such document!");
              }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
          }

        },
    },
    props: {
      source: String
    },
    computed: {
      authenticated() {
        return this.$store.state.authenticated;
      },
      ...mapLenderFields([
        'lenderData',
        'lenderDataOps'
      ]),
      ...mapUserFields([
        'userData',
        'userDataOps'
      ]),
    },
    components: {
      snackBar,
      sideBar,
      topBar
    },
    created: function () {
      this.$store.state.authenticated = firebase.auth().currentUser;
      this.$store.state.admin = true;
      this.$store.commit('resetUserData', 'Im not important');
      this.loadUserData();
      this.loadLenderData();
    }
  }
</script>

<style>
  #app {
    text-align: center;
    display:flex;
    align-items: center;
    justify-content: center;
  }
  .full-width {
    width:100%;
  }
  .z-light-blue{
    background-color: #94D0E4 !important;
    color:#536B71 !important;
  }
</style>
