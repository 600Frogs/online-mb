<template>
  <div>
        <v-tabs fixed-tabs slider-color="red" fluid color="grey lighten-5">
          <v-tab ripple>
            <v-icon color="red" class="validationIcon" v-if="!userData.checkData.basicDetailsApp1">highlight_off</v-icon>
            <v-icon color="green" class="validationIcon" v-else>check_circle</v-icon>
            Applicant 1
          </v-tab>
          <v-tab v-if="showApplicantTwo" ripple>
            <v-icon color="red" class="validationIcon" v-if="!userData.checkData.basicDetailsApp2">highlight_off</v-icon>
            <v-icon color="green" class="validationIcon" v-else>check_circle</v-icon>
            Applicant 2
          </v-tab>

        <v-tab-item>
          <v-card flat>
            <v-form fluid>
              <v-container grid-list-md fluid text-cs-center>
                <h2>Basic Details</h2>
                <v-layout row wrap justify-space-around>
                  <v-flex xs3>
                    <v-text-field :rules="[checkData(userData.firstName, 'First Name')]" label="First Name" v-model="userData.firstName"></v-text-field>
                  </v-flex>
                  <v-flex xs3>
                    <v-text-field label="Middle Name(s)" v-model="userData.middleName"></v-text-field>
                  </v-flex>
                  <v-flex xs3>
                    <v-text-field :rules="[checkData(userData.surname, 'Surname')]" label="Surname" v-model="userData.surname"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row wrap justify-space-around>
                  <v-flex xs3>
                    <v-text-field type="email" :rules="[checkData(userData.email, 'Email'), validEmail(userData.email)]" label="Email" v-model="userData.email"></v-text-field>
                  </v-flex>
                  <v-flex xs3>
                    <v-text-field :rules="[checkData(userData.phoneNumber, 'Contact Number')]" label="Contact Number" v-model="userData.phoneNumber"></v-text-field>
                  </v-flex>
                  <v-flex xs3>
                    <v-dialog
                     :rules="[checkData(userData.dateOfBirth, 'Date of Birth')]"
                      ref="dialog"
                      v-model="modalDOB"
                      :return-value.sync="userData.dateOfBirth"
                      persistent
                      lazy
                      full-width
                      width="290px"
                    >
                      <v-text-field
                        slot="activator"
                        v-model="userData.dateOfBirth"
                        label="Date Of Birth"
                        prepend-icon="event"
                        readonly
                      ></v-text-field>
                      <v-date-picker v-model="userData.dateOfBirth" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="modalDOB = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.dialog.save(userData.dateOfBirth)">OK</v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <h2>Miscellaneous</h2>
                <v-layout row wrap justify-center>
                  <v-flex xs5>
                    <v-select label="Have you bought a house before?" :items="userDataOps.purchasedBefore" v-model="userData.purchasedBefore"></v-select>
                  </v-flex>
                  <v-flex xs3>
                    <v-select
                        :items="userDataOps.citizenStatus"
                        label="Residency Status"
                        v-model="userData.citizenStatus"
                    ></v-select>
                  </v-flex>
                  <v-flex xs3>
                    <v-select
                      :items="userDataOps.relationshipStatus"
                      label="Relationship Status"
                      v-model="userData.relationshipStatus"
                    ></v-select>
                  </v-flex>
                </v-layout>
                <v-layout row wrap justify-center>
                  <v-flex xs4>
                    <v-select :items="userDataOps.numberOfApplicants" v-model="userData.numberOfApplicants" label="Number of Applicants"></v-select>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field v-model="userData.numberOfDependents" label="Number of Dependent Children"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
              </v-form>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-form fluid>
              <v-container grid-list-md fluid text-cs-center>
                <h2>Basic Details</h2>
                <v-layout row wrap justify-space-around>
                  <v-flex xs3>
                    <v-text-field :rules="[checkData(userData.applicantTwo.firstName, 'First Name')]" label="First Name" v-model="userData.applicantTwo.firstName"></v-text-field>
                  </v-flex>
                  <v-flex xs3>
                    <v-text-field label="Middle Name(s)" v-model="userData.applicantTwo.middleName"></v-text-field>
                  </v-flex>
                  <v-flex xs3>
                    <v-text-field :rules="[checkData(userData.applicantTwo.surname, 'Surname')]" label="Surname" v-model="userData.applicantTwo.surname"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row wrap justify-space-around>
                  <v-flex xs3>
                    <v-text-field :rules="[checkData(userData.applicantTwo.email, 'Email'), validEmail(userData.email)]" label="Email" v-model="userData.applicantTwo.email"></v-text-field>
                  </v-flex>
                  <v-flex xs3>
                    <v-text-field :rules="[checkData(userData.applicantTwo.phoneNumber, 'Phone Number')]" label="Contact Number" v-model="userData.applicantTwo.phoneNumber"></v-text-field>
                  </v-flex>
                  <v-flex xs3>
                    <v-dialog
                      ref="dialog2"
                      v-model="modalDOB2"
                      :return-value.sync="userData.applicantTwo.dateOfBirth"
                      persistent
                      lazy
                      full-width
                      width="290px"
                    >
                      <v-text-field
                        slot="activator"
                        v-model="userData.applicantTwo.dateOfBirth"
                        label="Date Of Birth"
                        prepend-icon="event"
                        readonly
                      ></v-text-field>
                      <v-date-picker v-model="userData.applicantTwo.dateOfBirth" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="modalDOB2 = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.dialog2.save(userData.applicantTwo.dateOfBirth)">OK</v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <h2>Miscellaneous</h2>
                <v-layout row wrap justify-center>
                  <v-flex xs5>
                    <v-select label="Have you bought a house before?" :items="userDataOps.purchasedBefore" v-model="userData.applicantTwo.purchasedBefore"></v-select>
                  </v-flex>
                  <v-flex xs3>
                    <v-select
                        :items="userDataOps.citizenStatus"
                        label="Residency Status"
                        v-model="userData.applicantTwo.citizenStatus"
                    ></v-select>
                  </v-flex>
                  <v-flex xs3>
                    <v-select
                      :items="userDataOps.relationshipStatus"
                      label="Relationship Status"
                      v-model="userData.applicantTwo.relationshipStatus"
                    ></v-select>
                  </v-flex>
                </v-layout>
                <v-layout row wrap justify-center>
                  <v-flex xs6>
                    <v-select :items="userDataOps.partnerOfApplicantOne" v-model="userData.applicantTwo.partnerOfApplicantOne" label="Are you in a relationship with applicant one?"></v-select>
                  </v-flex>
                </v-layout>
              </v-container>
              </v-form>
          </v-card>
        </v-tab-item>
      </v-tabs>


  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";

export default {
  name: "basicdetails",
  data() {
    return {
      active: null,
      modalDOB: null,
      modalDOB2: null
    };
  },
  computed: {
    ...mapFields(["userData", "userDataOps"]),
    showApplicantTwo() {
      if (this.userData.numberOfApplicants == "Two") {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    checkData: function(payload, msg) {
      if (payload == "") {
        return "Please enter " + msg;
      }
      return true;
    },
    validEmail: function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(email) == false) {
        return "Email not valid";
      } else {
        return true;
      }
    },
    validate: function() {
      var app1 = this.userData;
      var app2 = this.userData.applicantTwo;
      if (
        !app1.firstName ||
        !app1.surname ||
        this.validEmail(app1.email) != true ||
        !app1.phoneNumber ||
        !app1.dateOfBirth ||
        !app1.purchasedBefore ||
        !app1.citizenStatus
      ) {
        this.userData.checkData.basicDetailsApp1 = false;
      } else {
        this.userData.checkData.basicDetailsApp1 = true;
      }
      if (
        app1.showApplicantTwo &&
        (!app2.firstName ||
          !app2.surname ||
          this.validEmail(app2.email) != true ||
          !app2.phoneNumber ||
          !app2.dateOfBirth ||
          !app2.purchasedBefore ||
          !app2.citizenStatus)
      ) {
        this.userData.checkData.basicDetailsApp2 = false;
      } else {
        this.userData.checkData.basicDetailsApp2 = true;
      }
      this.userData.checkData.basicDetails =
        this.userData.checkData.basicDetailsApp1 == true &&
        this.userData.checkData.basicDetailsApp2 == true;
    }
  },
  watch: {}
};
</script>
<style scoped>
h2 {
  margin: 18px;
}
</style>
