<template>
  <div>
        <v-tabs fixed-tabs slider-color="red" fluid color="grey lighten-5">
          <v-tab v-if="userData.numberOfApplicants=='One'" ripple>
            Applicant 1
          </v-tab>
          <v-tab v-if="userData.numberOfApplicants=='Two'" ripple>
            Joint
          </v-tab>
          <v-tab-item>
            <v-card flat>
              <v-form fluid>
                <v-container grid-list-md fluid text-cs-center>
                  <v-layout  row wrap justify-center>
                    <v-flex xs5>
                      <v-text-field type="number" step="100" v-model="userData.liabilities.livingExpenses.basicLivingExpenses" label="Basic Living Expenses (Monthly)"></v-text-field>
                      <span v-if="userData.liabilities.livingExpenses.basicLivingExpenses < 1"><p class="validationError">Please enter an amount more than zero</p></span>
                    </v-flex>
                  </v-layout>
                  <v-divider></v-divider>
                </v-container>
                <v-container grid-list-md fluid text-cs-center v-for='(liability, index) in this.userData.liabilities.additionalLiabilities'>
                    <v-layout justify-center row wrap>
                      <v-flex xs2>
                        <v-select :items="userDataOps.typeOfLiability" v-model="userData.liabilities.additionalLiabilities[index].type" label="Liability"></v-select>
                      </v-flex>
                      <v-flex v-if="userData.liabilities.additionalLiabilities[index].type=='Credit Card' || userData.liabilities.additionalLiabilities[index].type=='Personal Loan' || userData.liabilities.additionalLiabilities[index].type=='Car Loan' || userData.liabilities.additionalLiabilities[index].type=='Home Loan'" xs2>
                        <v-text-field type="text" v-model="userData.liabilities.additionalLiabilities[index].lender" label="Lender"></v-text-field>
                      </v-flex>
                      <v-flex v-if="userData.liabilities.additionalLiabilities[index].type!='Child Support'" xs2>
                        <v-text-field type="text" v-model="userData.liabilities.additionalLiabilities[index].moneyOwing" label="Amount Owing"></v-text-field>
                      </v-flex>
                      <v-flex v-if="userData.liabilities.additionalLiabilities[index].type!='Credit Card'" xs2>
                        <v-text-field type="number" step="100" v-model="userData.liabilities.additionalLiabilities[index].monthlyPayments" label="Monthly Payments ($)"></v-text-field>
                      </v-flex>
                      <v-flex v-if="userData.liabilities.additionalLiabilities[index].type=='Credit Card'" xs2>
                        <v-text-field type="number" step="100" v-model="userData.liabilities.additionalLiabilities[index].limit" label="Credit Limit ($)"></v-text-field>
                      </v-flex>
                      <v-flex xs1>
                        <v-btn color="error" @click.native="removeLiability(index)">Remove</v-btn>
                      </v-flex>
                    </v-layout>
                    <v-layout justify-center row wrap v-if="userData.liabilities.additionalLiabilities[index].type=='Home Loan'">
                      <v-flex xs4>
                        <v-select  :items="realEstate" v-model="userData.liabilities.additionalLiabilities[index].address" label="Link to asset"></v-select>
                      </v-flex>
                      <v-flex xs2>
                        <v-select  v-if="userData.numberOfApplicants=='Two'" :items="userDataOps.nameOnLoan" v-model="userData.liabilities.additionalLiabilities[index].nameOnLoan" label="Name on Loan"></v-select>
                      </v-flex>
                    </v-layout>
                    <v-layout justify-center row wrap v-if="userData.liabilities.additionalLiabilities[index].type=='Home Loan'">
                      <v-flex xs2>
                        <v-text-field type="number" step="0.1" v-model="userData.liabilities.additionalLiabilities[index].interestRate" label="Interest Rate (%)"></v-text-field>
                      </v-flex>
                      <v-flex xs2>
                        <v-text-field type="number" step="1" v-model="userData.liabilities.additionalLiabilities[index].termRemaining" label="Years Remaining"></v-text-field>
                      </v-flex>
                      <v-flex xs2>
                        <v-select  :items="userDataOps.yesNo" v-model="userData.liabilities.additionalLiabilities[index].taxDeductible" label="Tax Deductible?"></v-select>
                      </v-flex>
                      <v-flex xs2>
                        <v-text-field type="number" step="1" v-model="userData.liabilities.additionalLiabilities[index].iOTermRemaining" label="Interest Only (Years)"></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-divider></v-divider>
                </v-container>
                <v-btn color="primary" @click.native="addLiability">Add Liability</v-btn>
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
    realEstate() {
      var arr = [];
      var arraylength = this.userData.assets.additionalAssets.length;
      for (var i = 0; i < arraylength; i++) {
        if (this.userData.assets.additionalAssets[i].type == "Real Estate") {
          arr.push(this.userData.assets.additionalAssets[i].address);
        }
      }
      return arr;
    }
  },
  methods: {
    addLiability: function() {
      this.$store.commit("addLiability", "I'm not important! ");
    },
    removeLiability: function(i) {
      this.$store.commit("removeLiability", i);
    },
    validate: function() {
      if (this.userData.liabilities.livingExpenses.basicLivingExpenses < 1) {
        this.userData.checkData.liabilitiesDetails = false;
      } else {
        this.userData.checkData.liabilitiesDetails = true;
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
}
</style>
