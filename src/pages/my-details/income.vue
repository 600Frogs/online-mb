<template>
  <div>
        <v-tabs fixed-tabs slider-color="red" fluid color="grey lighten-5">
          <v-tab ripple>
            <v-icon color="red" class="validationIcon" v-if="userData.checkData.incomeDetailsApp1==false">highlight_off</v-icon>
            <v-icon color="green" class="validationIcon" v-else>check_circle</v-icon>
            Applicant 1
          </v-tab>
          <v-tab v-if="showApplicantTwo" ripple>
            <v-icon color="red" class="validationIcon" v-if="userData.checkData.incomeDetailsApp2==false">highlight_off</v-icon>
            <v-icon color="green" class="validationIcon" v-else>check_circle</v-icon>
            Applicant 2
          </v-tab>
          <v-tab-item>
            <v-card flat>
              <v-form fluid>
                <v-container grid-list-md fluid text-cs-center>
                  <v-layout  row wrap justify-center>
                    <v-flex xs3>
                      <v-text-field type="number" step="1000" v-model="userData.employment.baseWage" label="Base Wage ($)"></v-text-field>
                      <span v-if="userData.employment.baseWage < 1"><p class="validationError">Please enter an amount more than zero</p></span>
                    </v-flex>
                    <v-flex xs3>
                      <v-select :readonly="true" :items="userDataOps.baseWageType" v-model="userData.employment.baseWageType" label="Input Type"></v-select>
                    </v-flex>
                    <v-flex xs3>
                      <v-select :items="userDataOps.baseWagePeriod" v-model="userData.employment.baseWagePeriod" label="Base Wage Period"></v-select>
                    </v-flex>
                  </v-layout>
                  <v-layout  row wrap justify-center v-for='(income, index) in this.userData.income'>
                    <v-flex xs2>
                      <v-text-field type="number" v-model="userData.income[index].amount" label="Income ($)"></v-text-field>
                    </v-flex>
                    <v-flex xs2>
                      <v-select :items="userDataOps.typeOfIncome" v-model="userData.income[index].incomeType" label="Type of Income"></v-select>
                    </v-flex>
                    <v-flex xs2>
                      <v-select :items="userDataOps.baseWageType" v-model="userData.income[index].incomeInputType" label="Input Type"></v-select>
                    </v-flex>
                    <v-flex xs2>
                      <v-select :items="userDataOps.baseWagePeriod" v-model="userData.income[index].period" label="Period"></v-select>
                    </v-flex>
                    <v-flex xs1>
                      <v-btn color="error" @click.native="removeIncome(index)">Remove</v-btn>
                    </v-flex>
                  </v-layout>
                  <v-btn color="primary" @click.native="addIncome">Add Income</v-btn>
                </v-container>
              </v-form>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-form fluid>
                <v-container grid-list-md fluid text-cs-center>
                  <v-layout  row wrap justify-center v-if="!userData.applicantTwo.employment.notWorking">
                    <v-flex xs3>
                      <v-text-field type="number" step="1000" v-model="userData.applicantTwo.employment.baseWage" label="Base Wage ($)"></v-text-field>
                      <span v-if="userData.applicantTwo.employment.baseWage < 1"><p class="validationError">Please enter an amount more than zero</p></span>
                    </v-flex>
                    <v-flex xs3>
                      <v-select :readonly="true" :items="userDataOps.baseWageType" v-model="userData.applicantTwo.employment.baseWageType" label="Input Type"></v-select>
                    </v-flex>
                    <v-flex xs3>
                      <v-select :items="userDataOps.baseWagePeriod" v-model="userData.applicantTwo.employment.baseWagePeriod" label="Base Wage Period"></v-select>
                    </v-flex>
                  </v-layout>
                  <v-layout  row wrap justify-center v-for='(income, index) in this.userData.applicantTwo.income'>
                    <v-flex xs2>
                      <v-text-field type="number" v-model="userData.applicantTwo.income[index].amount" label="Income ($)"></v-text-field>
                    </v-flex>
                    <v-flex xs2>
                      <v-select :items="userDataOps.typeOfIncome" v-model="userData.applicantTwo.income[index].incomeType" label="Type of Income"></v-select>
                    </v-flex>
                    <v-flex xs2>
                      <v-select :items="userDataOps.baseWageType" v-model="userData.applicantTwo.income[index].incomeInputType" label="Input Type"></v-select>
                    </v-flex>
                    <v-flex xs2>
                      <v-select :items="userDataOps.baseWagePeriod" v-model="userData.applicantTwo.income[index].period" label="Period"></v-select>
                    </v-flex>
                    <v-flex xs1>
                      <v-btn color="error" @click.native="removeIncome2(index)">Remove</v-btn>
                    </v-flex>
                  </v-layout>
                  <v-btn color="primary" @click.native="addIncome2">Add Income</v-btn>
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
  name: "income",
  data() {
    return {
      active: null,
      modalDOB: null
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
    addIncome: function() {
      this.$store.commit("addIncome", "I'm not important! ");
    },
    removeIncome: function(i) {
      this.$store.commit("removeIncome", i);
    },
    addIncome2: function() {
      this.$store.commit("addIncome2", "I'm not important! ");
    },
    removeIncome2: function(i) {
      this.$store.commit("removeIncome2", i);
    },
    validate: function() {
      this.userData.checkData.incomeDetailsApp1 = true;
      this.userData.checkData.incomeDetailsApp2 = true;
      if (this.userData.employment.baseWage < 1) {
        this.userData.checkData.incomeDetailsApp1 = false;
      }
      if (
        this.showApplicantTwo &&
        !this.userData.applicantTwo.employment.notWorking &&
        this.userData.applicantTwo.employment.baseWage < 1
      ) {
        this.userData.checkData.incomeDetailsApp2 = false;
      }
      if (
        this.userData.checkData.incomeDetailsApp1 == true &&
        this.userData.checkData.incomeDetailsApp2 == true
      ) {
        this.userData.checkData.incomeDetails = true;
      } else {
        this.userData.checkData.incomeDetails = false;
      }
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
  margin-bottom: -21px;
}
</style>
