<template>
  <div>
        <v-tabs fixed-tabs slider-color="red" fluid color="grey lighten-5">
          <v-tab ripple>
            <v-icon color="red" class="validationIcon" v-if="userData.checkData.residentialDetailsApp1==false">highlight_off</v-icon>
            <v-icon color="green" class="validationIcon" v-else>check_circle</v-icon>
            Applicant 1
          </v-tab>
          <v-tab v-if="showApplicantTwo" ripple>
            <v-icon color="red" class="validationIcon" v-if="userData.checkData.residentialDetailsApp2==false">highlight_off</v-icon>
            <v-icon color="green" class="validationIcon" v-else>check_circle</v-icon>
            Applicant 2
          </v-tab>

        <v-tab-item>
          <v-form fluid>
            <v-container grid-list-md fluid text-cs-center>
              <h2>Residential Details</h2>
              <v-layout row wrap justify-center>
                <v-flex xs6>
                  <vuetify-google-autocomplete
                    :clearable="true"
                    id="currentAddress"
                    :disabled="false"
                    label="Current Residential Address"
                    placeholder="Current Address"
                    prepend-icon="search"
                    country="AU"
                    :enable-geolocation= "true"
                    ref="currentAddress"
                    v-model="userData.residential.currentAddress">
                  </vuetify-google-autocomplete>
                  <span v-if="!userData.residential.currentAddress"><p class="validationError">Please enter valid address</p></span>
                </v-flex>
                <v-flex xs3>
                  <v-text-field label="Months at this address" v-model="userData.residential.timeAtCurrent"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap justify-center>
                <v-flex xs5>
                  <v-select :items="userDataOps.residentialStatus" label="Residency Status" v-model="userData.residential.currentArrangement"></v-select>
                </v-flex>
                <v-flex xs3>
                  <v-text-field v-if="needRentPaid" label="Weekly Rent Paid" v-model="userData.residential.weeklyRentPaid"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap justify-center v-if="needRentPaid">
                <v-flex xs5>
                  <v-select :items="userDataOps.yesNo" label="Will you still be renting here after settlement?" v-model="userData.residential.rentingPostSettlement"></v-select>
                </v-flex>
              </v-layout>
              <v-divider v-if="showSecondAdd"></v-divider>
              <h2 v-if="showSecondAdd">Previous Address</h2>
              <v-layout  v-if="showSecondAdd" row wrap justify-space-around>
                <v-flex xs9>
                  <vuetify-google-autocomplete
                    :clearable="true"
                    id="previousAddress"
                    :disabled="false"
                    label="Previous Residential Address"
                    placeholder="Previous Address"
                    prepend-icon="search"
                    country="AU"
                    :enable-geolocation= "true"
                    v-model="userData.residential.previousAddress">
                  </vuetify-google-autocomplete>
                  <span v-if="!userData.residential.previousAddress"><p class="validationError">Please enter valid address</p></span>
                </v-flex>
              </v-layout>
              <v-layout  v-if="showSecondAdd" row wrap justify-center>
                <v-flex xs4>
                  <v-text-field label="Months at this address" v-model="userData.residential.timeAtPrevious"></v-text-field>
                </v-flex>
              </v-layout>
              <v-divider v-if="showThirdAdd"></v-divider>
              <h2 v-if="showThirdAdd">Previous Address (2)</h2>
              <v-layout  v-if="showThirdAdd" row wrap justify-space-around>
                <v-flex xs9>
                  <vuetify-google-autocomplete
                    :clearable="true"
                    id="previousAddress2"
                    :disabled="false"
                    label="Previous Residential Address"
                    placeholder="Previous Address"
                    prepend-icon="search"
                    country="AU"
                    :enable-geolocation= "true"
                    v-model="userData.residential.previousAddress2">
                  </vuetify-google-autocomplete>
                  <span v-if="!userData.residential.previousAddress2"><p class="validationError">Please enter valid address</p></span>
                </v-flex>
              </v-layout>
              <v-layout  v-if="showThirdAdd" row wrap justify-center>
                <v-flex xs4>
                  <v-text-field label="Months at this address" v-model="userData.residential.timeAtPrevious2"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>

          </v-form>
        </v-tab-item>
      <v-tab-item>
        <v-container mt-2 pb-0>
          <v-flex>
            <v-btn color="red lighten-5" @click.native="copyAppOne">Copy Details of Applicant One</v-btn>
          </v-flex>
        </v-container>
        <v-form fluid>
          <v-container grid-list-md fluid text-cs-center>
            <h2>Residential Details</h2>
            <v-layout row wrap justify-center>
              <v-flex xs6>
                <vuetify-google-autocomplete
                  :clearable="true"
                  id="currentAddressT"
                  :disabled="false"
                  label="Current Residential Address"
                  placeholder="Current Address"
                  prepend-icon="search"
                  country="AU"
                  :enable-geolocation= "true"
                  v-model="userData.applicantTwo.residential.currentAddress">
                </vuetify-google-autocomplete>
                <span v-if="!userData.applicantTwo.residential.currentAddress"><p class="validationError">Please enter valid address</p></span>
              </v-flex>
              <v-flex xs3>
                <v-text-field label="Months at this address" v-model="userData.applicantTwo.residential.timeAtCurrent"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap justify-center>
              <v-flex xs5>
                <v-select :items="userDataOps.residentialStatus" label="Residency Status" v-model="userData.applicantTwo.residential.currentArrangement"></v-select>
              </v-flex>
              <v-flex xs3>
                <v-text-field v-if="needRentPaid2" label="Weekly Rent Paid" v-model="userData.applicantTwo.residential.weeklyRentPaid"></v-text-field>
              </v-flex>
            </v-layout>
            <v-divider v-if="showSecondAdd2"></v-divider>
            <h2 v-if="showSecondAdd2">Previous Address</h2>
            <v-layout  v-if="showSecondAdd2" row wrap justify-space-around>
              <v-flex xs9>
                <vuetify-google-autocomplete
                  :clearable="true"
                  id="previousAddressT"
                  :disabled="false"
                  label="Previous Residential Address"
                  placeholder="Previous Address"
                  prepend-icon="search"
                  country="AU"
                  :enable-geolocation= "true"
                  v-model="userData.applicantTwo.residential.previousAddress">
                </vuetify-google-autocomplete>
                <span v-if="!userData.applicantTwo.residential.previousAddress"><p class="validationError">Please enter valid address</p></span>
              </v-flex>
            </v-layout>
            <v-layout  v-if="showSecondAdd2" row wrap justify-center>
              <v-flex xs4>
                <v-text-field label="Months at this address" v-model="userData.applicantTwo.residential.timeAtPrevious"></v-text-field>
              </v-flex>
            </v-layout>
            <v-divider v-if="showThirdAdd2"></v-divider>
            <h2 v-if="showThirdAdd2">Previous Address (2)</h2>
            <v-layout  v-if="showThirdAdd2" row wrap justify-space-around>
              <v-flex xs9>
                <vuetify-google-autocomplete
                  :clearable="true"
                  id="previousAddress2T"
                  :disabled="false"
                  label="Previous Residential Address"
                  placeholder="Previous Address"
                  prepend-icon="search"
                  country="AU"
                  :enable-geolocation= "true"
                  v-model="userData.applicantTwo.residential.previousAddress2">
                </vuetify-google-autocomplete>
                <span v-if="!userData.applicantTwo.residential.previousAddress2"><p class="validationError">Please enter valid address</p></span>
              </v-flex>
            </v-layout>
            <v-layout  v-if="showThirdAdd2" row wrap justify-center>
              <v-flex xs4>
                <v-text-field label="Months at this address" v-model="userData.applicantTwo.residential.timeAtPrevious2"></v-text-field>
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
  name: "residentialdetails",
  data() {
    return {
      active: null,
      modalDOB: null
    };
  },
  computed: {
    ...mapFields(["userData", "userDataOps"]),
    showSecondAdd() {
      let num = this.userData.residential.timeAtCurrent;
      if (num < 36) {
        return true;
      } else {
        return false;
      }
    },
    showThirdAdd() {
      let num =
        parseInt(this.userData.residential.timeAtCurrent) +
        parseInt(this.userData.residential.timeAtPrevious);
      if (num < 36) {
        return true;
      } else {
        return false;
      }
    },
    showSecondAdd2() {
      let num = this.userData.applicantTwo.residential.timeAtCurrent;
      if (num < 36) {
        return true;
      } else {
        return false;
      }
    },
    showThirdAdd2() {
      let num =
        parseInt(this.userData.applicantTwo.residential.timeAtCurrent) +
        parseInt(this.userData.applicantTwo.residential.timeAtPrevious);
      if (num < 36) {
        return true;
      } else {
        return false;
      }
    },
    needRentPaid() {
      let status = this.userData.residential.currentArrangement;
      if (
        status == "Renting through a Real Estate Agent" ||
        status == "Renting - Privately" ||
        status == "Boarding i.e. with parents or family"
      ) {
        return true;
      } else {
        return false;
      }
    },
    needRentPaid2() {
      let status = this.userData.applicantTwo.residential.currentArrangement;
      if (
        status == "Renting through a Real Estate Agent" ||
        status == "Renting - Privately" ||
        status == "Boarding i.e. with parents or family"
      ) {
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
    copyAppOne: function() {
      this.userData.applicantTwo.residential = JSON.parse(
        JSON.stringify(this.userData.residential)
      );
    },
    validate: function() {
      const app1 = this.userData.residential;
      const app2 = this.userData.applicantTwo.residential;
      if (
        //!app1.currentAddress ||
        !app1.timeAtCurrent ||
        !app1.currentArrangement ||
        (this.showSecondAdd &&
          (!app1.previousAddress || !app1.timeAtPrevious)) ||
        (this.showThirdAdd && (!app1.previousAddress2 || !app1.timeAtPrevious2))
      ) {
        this.userData.checkData.residentialDetailsApp1 = false;
      } else {
        this.userData.checkData.residentialDetailsApp1 = true;
      }
      if (
        this.showApplicantTwo && //!app2.currentAddress ||
        (!app2.timeAtCurrent ||
          !app2.currentArrangement ||
          (this.showSecondAdd2 &&
            (!app2.previousAddress || !app2.timeAtPrevious)) ||
          (this.showThirdAdd2 &&
            (!app2.previousAddress2 || !app2.timeAtPrevious2)))
      ) {
        this.userData.checkData.residentialDetailsApp2 = false;
      } else {
        this.userData.checkData.residentialDetailsApp2 = true;
      }

      this.userData.checkData.residentialDetails =
        this.userData.checkData.residentialDetailsApp1 &&
        this.userData.checkData.residentialDetailsApp2;
    }
  },

  watch: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  margin: 18px;
}
.validationError {
  color: red;
  margin-top: -20px;
  margin-bottom: -20px;
  padding-bottom: 6px;
}
</style>
