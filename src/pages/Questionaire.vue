
<template>
    <v-container fluid fill-height>
      <v-layout flex align-center justify-content>
        <v-flex>
          <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1">Basic Details</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="e1 > 2" step="2">Employment Details</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="e1 > 3" step="3">Financial Details</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="e1 > 4" step="4">Security Details</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="5">Loan Details</v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1">
                <v-form>
                    <v-flex>
                          <v-select
                              :items="userDataOps.citizenStatus"
                              label="Residency Status"
                              v-model="userData.citizenStatus"
                          ></v-select>
                    </v-flex>
                  </v-form>
              <v-btn flat @click.native="e1 = 1; saveData()">Cancel</v-btn>
              <v-btn color="primary" @click.native="e1 = 2; saveData()">Continue</v-btn>
            </v-stepper-content>
            <v-stepper-content step="2">
                <v-form>
                    <v-flex>
                          <v-select
                              :items="userDataOps.typeOfEmployment"
                              v-model="userData.employment.typeOfEmployment"
                              label="Type of employment"
                          ></v-select>
                    </v-flex>
                    <v-flex>
                      <v-dialog
                        ref="dialog"
                        v-model="modal"
                        :return-value.sync="userData.employment.dateStarted"
                        persistent
                        lazy
                        full-width
                        width="290px"
                      >
                        <v-text-field
                          slot="activator"
                          v-model="userData.employment.dateStarted"
                          label="When did you start in your current role?"
                          prepend-icon="event"
                          readonly
                        ></v-text-field>
                        <v-date-picker v-model="userData.employment.dateStarted" scrollable>
                          <v-spacer></v-spacer>
                          <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                          <v-btn flat color="primary" @click="$refs.dialog.save(userData.employment.dateStarted)">OK</v-btn>
                        </v-date-picker>
                      </v-dialog>
                    </v-flex>
                  </v-form>
              <v-btn flat @click.native="e1 = 1; saveData()">Cancel</v-btn>
              <v-btn color="primary" @click.native="e1 = 3; saveData()">Continue</v-btn>
            </v-stepper-content>
            <v-stepper-content step="3">
              <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
              <v-btn flat @click.native="e1 = 2; saveData()">Back</v-btn>
              <v-btn color="primary" @click.native="e1 = 4; saveData()">Continue</v-btn>
            </v-stepper-content>
            <v-stepper-content step="4">
              <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
              <v-btn flat @click.native="e1 = 3; saveData()">Back</v-btn>
              <v-btn color="primary" @click.native="e1 = 5; saveData()">Continue</v-btn>
            </v-stepper-content>
            <v-stepper-content step="5">
              <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
              <v-btn flat @click.native="e1 = 4; saveData()">Back</v-btn>
              <v-btn color="primary" @click.native="e1 = 1; saveData()">Continue</v-btn>
            </v-stepper-content>
            </v-stepper-items>
            </v-stepper>
          </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import firebase from 'firebase'

    export default {
        name: 'Questionaire',
        data: function () {
            return {
              e1: 0,
              modal: null
            }
          },
        methods: {
          saveData: function() {
            var vm = this;
            if (this.authenticated) {
              var data = {};
              for (var element in vm.userData) {
                data[element] = vm.userData[element];
              };
              firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).set(
                data
              ).then(function(doc) {

              }).catch(function(error) {

              });
            } else {
              vm.$store.commit('setUserData', vm.userData);
            }
          },
          loadData: function() {
            var vm = this;
            if (this.authenticated) {
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
          }
        },
        computed: {
          authenticated() {
            return this.$store.state.authenticated;
          },
          ...mapFields(['userData', 'userDataOps'])
        },
        created: function() {
          this.loadData();
        },
        beforeDestroy: function() {
          this.saveData();
        }
    };
</script>

<style scoped>
    v-stepper{
        vertical-align:middle;
    }

</style>
