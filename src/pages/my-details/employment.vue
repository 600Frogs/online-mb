<template>
  <div>
        <v-tabs fixed-tabs slider-color="red" fluid color="grey lighten-5">
          <v-tab ripple>
            <v-icon color="red" class="validationIcon" v-if="userData.checkData.employmentDetailsApp1==false">highlight_off</v-icon>
            <v-icon color="green" class="validationIcon" v-else>check_circle</v-icon>
            Applicant 1
          </v-tab>
          <v-tab v-if="showApplicantTwo" ripple>
            <v-icon color="red" class="validationIcon" v-if="userData.checkData.employmentDetailsApp2==false">highlight_off</v-icon>
            <v-icon color="green" class="validationIcon" v-else>check_circle</v-icon>
            Applicant 2
          </v-tab>

        <v-tab-item>
          <v-form fluid>
            <v-container grid-list-md fluid text-cs-center>
              <h2>Employment Details</h2>
              <v-layout row wrap justify-center>
                <v-flex xs3>
                  <v-text-field label="Current Position" v-model="userData.employment.currentPosition"></v-text-field>
                </v-flex>
                <v-flex xs3>
                  <v-dialog ref="dialog" v-model="modalStart" :return-value.sync="userData.employment.dateStarted" persistent lazy full-width width="290px">
                    <v-text-field slot="activator" v-model="userData.employment.dateStarted" label="When did you start?" prepend-icon="event" readonly></v-text-field>
                    <v-date-picker v-model="userData.employment.dateStarted" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="modalStart = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.dialog.save(userData.employment.dateStarted)">OK</v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-flex>
                <v-flex xs2>
                  <v-select :items="userDataOps.onProbation" label="On Probation?" v-model="userData.employment.onProbation"></v-select>
                </v-flex>
              </v-layout>
              <v-layout row wrap justify-center>
                <v-flex xs4>
                  <v-select :items="userDataOps.typeOfEmployment" label="Type of employment" v-model="userData.employment.typeOfEmployment"></v-select>
                </v-flex>
                <v-flex xs4>
                  <v-text-field label="Current Employer" v-model="userData.employment.currentEmployer"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout  row wrap justify-space-around>

                <v-flex xs9>
                  <vuetify-google-autocomplete
                    :clearable="true"
                    id="employAddress"
                    :disabled="false"
                    label="Employer's Address"
                    prepend-icon="search"
                    country="AU"
                    :enable-geolocation= "true"
                    v-model="userData.employment.address">
                  </vuetify-google-autocomplete>

                </v-flex>
              </v-layout>
              <v-layout  row wrap justify-center>
                <v-flex xs3>
                  <v-text-field type="number" step="1000" v-model="userData.employment.baseWage" label="Base Wage ($)"></v-text-field>
                </v-flex>
                <v-flex xs3>
                  <v-select :readonly="true" :items="userDataOps.baseWageType" v-model="userData.employment.baseWageType" label="Input Type"></v-select>
                </v-flex>
                <v-flex xs3>
                  <v-select :items="userDataOps.baseWagePeriod" v-model="userData.employment.baseWagePeriod" label="Base Wage Period"></v-select>
                </v-flex>
              </v-layout>
              <v-layout  row wrap justify-center>
                <v-flex xs6 mb-3>
                  Please note: Overtime and allowances should be added to the 'income' tab.
                </v-flex>
              </v-layout>
              <v-divider v-if="showSecondEmp"></v-divider>
              <h2 v-if="showSecondEmp">Previous Employer</h2>
              <v-layout  v-if="showSecondEmp" row wrap justify-center>
                <v-flex xs3>
                  <v-text-field label="Position" v-model="userData.employment.previousEmployment.position"></v-text-field>
                </v-flex>
                <v-flex xs3>
                  <v-text-field label="Employer" v-model="userData.employment.previousEmployment.employer"></v-text-field>
                </v-flex>
                <v-flex xs3>
                  <v-text-field label="Months in Job" v-model="userData.employment.previousEmployment.monthsInEmployment"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout  v-if="showSecondEmp" row wrap justify-center>
                <v-flex xs3>
                  <v-select :items="userDataOps.typeOfEmployment" label="Type of employment" v-model="userData.employment.previousEmployment.typeOfEmployment"></v-select>
                </v-flex>
                <v-flex xs6>
                  <vuetify-google-autocomplete
                    :clearable="true"
                    id="employAddress2"
                    :disabled="false"
                    label="Employer's Address"
                    prepend-icon="search"
                    country="AU"
                    :enable-geolocation= "true"
                    v-model="userData.employment.previousEmployment.address">
                  </vuetify-google-autocomplete>
                </v-flex>
              </v-layout>
              <v-divider v-if="showThirdEmp"></v-divider>
              <h2 v-if="showThirdEmp">Previous Employer (2)</h2>
              <v-layout  v-if="showThirdEmp" row wrap justify-center>
                <v-flex xs3>
                  <v-text-field label="Position" v-model="userData.employment.previousEmployment2.position"></v-text-field>
                </v-flex>
                <v-flex xs3>
                  <v-text-field label="Employer" v-model="userData.employment.previousEmployment2.employer"></v-text-field>
                </v-flex>
                <v-flex xs3>
                  <v-text-field label="Months in Job" v-model="userData.employment.previousEmployment2.monthsInEmployment"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout  v-if="showThirdEmp" row wrap justify-center>
                <v-flex xs3>
                  <v-select :items="userDataOps.typeOfEmployment" label="Type of employment" v-model="userData.employment.previousEmployment2.typeOfEmployment"></v-select>
                </v-flex>
                <v-flex xs6>
                  <vuetify-google-autocomplete
                    :clearable="true"
                    id="employAddress3"
                    :disabled="false"
                    label="Employer's Address"
                    prepend-icon="search"
                    country="AU"
                    :enable-geolocation= "true"
                    v-model="userData.employment.previousEmployment2.address">
                  </vuetify-google-autocomplete>
                </v-flex>
              </v-layout>
            </v-container>

          </v-form>
        </v-tab-item>
        <v-tab-item>
          <v-form fluid>
            <v-container grid-list-md fluid text-cs-center>
              <h2>Employment Details</h2>
              <v-layout row wrap justify-center>
                <v-flex xs3>
                  <v-checkbox color="blue" label="I'm not working" v-model="userData.applicantTwo.employment.notWorking"></v-checkbox>
                </v-flex>
              </v-layout>
              <v-layout row wrap justify-center v-if="!userData.applicantTwo.employment.notWorking">
                <v-flex xs3>
                  <v-text-field label="Current Position" v-model="userData.applicantTwo.employment.currentPosition"></v-text-field>
                </v-flex>
                <v-flex xs3>
                  <v-dialog ref="dialog2" v-model="modalStart2" :return-value.sync="userData.applicantTwo.employment.dateStarted" persistent lazy full-width width="290px">
                    <v-text-field slot="activator" v-model="userData.applicantTwo.employment.dateStarted" label="When did you start?" prepend-icon="event" readonly></v-text-field>
                    <v-date-picker v-model="userData.applicantTwo.employment.dateStarted" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="modalStart2 = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.dialog2.save(userData.applicantTwo.employment.dateStarted)">OK</v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-flex>
                <v-flex xs2>
                  <v-select :items="userDataOps.onProbation" label="On Probation?" v-model="userData.applicantTwo.employment.onProbation"></v-select>
                </v-flex>
              </v-layout>
              <v-layout row wrap justify-center v-if="!userData.applicantTwo.employment.notWorking">
                <v-flex xs4>
                  <v-select :items="userDataOps.typeOfEmployment" label="Type of employment" v-model="userData.applicantTwo.employment.typeOfEmployment"></v-select>
                </v-flex>
                <v-flex xs4>
                  <v-text-field label="Current Employer" v-model="userData.applicantTwo.employment.currentEmployer"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout  row wrap justify-space-around v-if="!userData.applicantTwo.employment.notWorking">
                <v-flex xs9>
                  <vuetify-google-autocomplete
                    :clearable="true"
                    id="employAddressApp2"
                    :disabled="false"
                    label="Employer's Address"
                    prepend-icon="search"
                    country="AU"
                    :enable-geolocation= "true"
                    v-model="userData.applicantTwo.employment.address">
                  </vuetify-google-autocomplete>
                </v-flex>
              </v-layout>
              <v-layout  row wrap justify-center v-if="!userData.applicantTwo.employment.notWorking">
                <v-flex xs3>
                  <v-text-field type="number" step="1000" v-model="userData.applicantTwo.employment.baseWage" label="Base Wage ($)"></v-text-field>
                </v-flex>
                <v-flex xs3>
                  <v-select :items="userDataOps.baseWageType" v-model="userData.applicantTwo.employment.baseWageType" label="Input Type"></v-select>
                </v-flex>
                <v-flex xs3>
                  <v-select :items="userDataOps.baseWagePeriod" v-model="userData.applicantTwo.employment.baseWagePeriod" label="Base Wage Period"></v-select>
                </v-flex>
              </v-layout>
              <v-layout  row wrap justify-center v-if="!userData.applicantTwo.employment.notWorking">
                <v-flex xs6 mb-3>
                  Please note: Overtime and allowances should be added to the 'additional income' section further down.
                </v-flex>
              </v-layout>
              <v-divider v-if="showSecondEmp2"></v-divider>
              <h2 v-if="showSecondEmp2">Previous Employer</h2>
              <v-layout  v-if="showSecondEmp2" row wrap justify-center>
                <v-flex xs3>
                  <v-text-field label="Position" v-model="userData.applicantTwo.employment.previousEmployment.position"></v-text-field>
                </v-flex>
                <v-flex xs3>
                  <v-text-field label="Employer" v-model="userData.applicantTwo.employment.previousEmployment.employer"></v-text-field>
                </v-flex>
                <v-flex xs3>
                  <v-text-field label="Months in Job" v-model="userData.applicantTwo.employment.previousEmployment.monthsInEmployment"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout  v-if="showSecondEmp2" row wrap justify-center>
                <v-flex xs3>
                  <v-select :items="userDataOps.typeOfEmployment" label="Type of employment" v-model="userData.applicantTwo.employment.previousEmployment.typeOfEmployment"></v-select>
                </v-flex>
                <v-flex xs6>
                  <vuetify-google-autocomplete
                    :clearable="true"
                    id="prevEmployAddressApp2"
                    :disabled="false"
                    label="Employer's Address"
                    prepend-icon="search"
                    country="AU"
                    :enable-geolocation= "true"
                    v-model="userData.applicantTwo.employment.previousEmployment.address">
                  </vuetify-google-autocomplete>
                </v-flex>
              </v-layout>
              <v-divider v-if="showThirdEmp2"></v-divider>
              <h2 v-if="showThirdEmp2">Previous Employer (2)</h2>
              <v-layout  v-if="showThirdEmp2" row wrap justify-center>
                <v-flex xs3>
                  <v-text-field label="Position" v-model="userData.applicantTwo.employment.previousEmployment2.position"></v-text-field>
                </v-flex>
                <v-flex xs3>
                  <v-text-field label="Employer" v-model="userData.applicantTwo.employment.previousEmployment2.employer"></v-text-field>
                </v-flex>
                <v-flex xs3>
                  <v-text-field label="Months in Job" v-model="userData.applicantTwo.employment.previousEmployment2.monthsInEmployment"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout  v-if="showThirdEmp2" row wrap justify-center>
                <v-flex xs3>
                  <v-select :items="userDataOps.typeOfEmployment" label="Type of employment" v-model="userData.applicantTwo.employment.previousEmployment2.typeOfEmployment"></v-select>
                </v-flex>
                <v-flex xs6>
                  <vuetify-google-autocomplete
                    :clearable="true"
                    id="employAddress3"
                    :disabled="false"
                    label="Employer's Address"
                    prepend-icon="search"
                    country="AU"
                    :enable-geolocation= "true"
                    v-model="userData.applicantTwo.employment.previousEmployment2.address">
                  </vuetify-google-autocomplete>
                </v-flex>
              </v-layout>
            </v-container>

          </v-form>
        </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import VuetifyGoogleAutocomplete from "vuetify-google-autocomplete";

export default {
  name: "employmentdetails",
  data() {
    return {
      active: null,
      modalStart: null,
      modalStart2: null
    };
  },
  computed: {
    ...mapFields(["userData", "userDataOps"]),
    showSecondEmp() {
      let dateStarted = new Date(this.userData.employment.dateStarted);
      let todaysDate = new Date();
      let timeDiff = Math.abs(todaysDate.getTime() - dateStarted.getTime());
      let daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      if (daysDiff < 1068) {
        return true;
      } else {
        return false;
      }
    },
    showThirdEmp() {
      let dateStarted = new Date(this.userData.employment.dateStarted);
      let todaysDate = new Date();
      let timeDiff = Math.abs(todaysDate.getTime() - dateStarted.getTime());
      let daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      let totalDaysDiff =
        daysDiff +
        this.userData.employment.previousEmployment.monthsInEmployment * 30;
      if (totalDaysDiff < 1068) {
        return true;
      } else {
        return false;
      }
    },
    showSecondEmp2() {
      let dateStarted = new Date(
        this.userData.applicantTwo.employment.dateStarted
      );
      let todaysDate = new Date();
      let timeDiff = Math.abs(todaysDate.getTime() - dateStarted.getTime());
      let daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      if (daysDiff < 1068) {
        return true;
      } else {
        return false;
      }
    },
    showThirdEmp2() {
      let dateStarted = new Date(
        this.userData.applicantTwo.employment.dateStarted
      );
      let todaysDate = new Date();
      let timeDiff = Math.abs(todaysDate.getTime() - dateStarted.getTime());
      let daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      let totalDaysDiff =
        daysDiff +
        this.userData.applicantTwo.employment.previousEmployment
          .monthsInEmployment *
          30;
      if (totalDaysDiff < 1068) {
        return true;
      } else {
        return false;
      }
    },
    showApplicantTwo() {
      if (this.userData.numberOfApplicants == "Two") {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    validate: function() {
      let app1 = this.userData.employment;
      let app2 = this.userData.applicantTwo.employment;
      this.userData.checkData.employmentDetailsApp1 = true;
      this.userData.checkData.employmentDetailsApp2 = true;
      if (
        !app1.currentPosition ||
        !app1.dateStarted ||
        !app1.onProbation ||
        !app1.typeOfEmployment ||
        !app1.currentEmployer ||
        app1.baseWage == 0 ||
        !app1.baseWageType ||
        !app1.baseWagePeriod
      ) {
        this.userData.checkData.employmentDetailsApp1 = false;
      }
      if (this.showSecondEmp) {
        if (
          !app1.previousEmployment.position ||
          !app1.previousEmployment.employer ||
          !app1.previousEmployment.monthsInEmployment ||
          !app1.previousEmployment.typeOfEmployment
        ) {
          this.userData.checkData.employmentDetailsApp1 = false;
        }
      }
      if (this.showThirdEmp) {
        if (
          !app1.previousEmployment2.position ||
          !app1.previousEmployment2.employer ||
          !app1.previousEmployment2.monthsInEmployment ||
          !app1.previousEmployment2.typeOfEmployment
        ) {
          this.userData.checkData.employmentDetailsApp1 = false;
        }
      }
      if (this.showApplicantTwo) {
        if (
          !app2.currentPosition ||
          !app2.dateStarted ||
          !app2.onProbation ||
          !app2.typeOfEmployment ||
          !app2.currentEmployer ||
          app2.baseWage == 0 ||
          !app2.baseWageType ||
          !app2.baseWagePeriod
        ) {
          this.userData.checkData.employmentDetailsApp2 = false;
        }
      }
      if (this.showApplicantTwo && this.showSecondEmp2) {
        if (
          !app2.previousEmployment.position ||
          !app2.previousEmployment.employer ||
          !app2.previousEmployment.monthsInEmployment ||
          !app2.previousEmployment.typeOfEmployment
        ) {
          this.userData.checkData.employmentDetailsApp2 = false;
        }
      }
      if (this.showApplicantTwo && this.showThirdEmp2) {
        if (
          !app2.previousEmployment2.position ||
          !app2.previousEmployment2.employer ||
          !app2.previousEmployment2.monthsInEmployment ||
          !app2.previousEmployment2.typeOfEmployment
        ) {
          this.userData.checkData.employmentDetailsApp2 = false;
        }
      }
      if (app2.notWorking) {
        this.userData.checkData.employmentDetailsApp2 = true;
      }
      if (
        this.userData.checkData.employmentDetailsApp1 == true &&
        this.userData.checkData.employmentDetailsApp2 == true
      ) {
        this.userData.checkData.employmentDetails = true;
      } else {
        this.userData.checkData.employmentDetails = false;
      }
    },
    getAddressData: function(addressData) {
      console.log(addressData);
      console.log(this);
      if (addressData) {
        this.userData.employment.address = addressData;
      }
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
