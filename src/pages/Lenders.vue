<template>
  <div>
    <h1>Lenders</h1>
    <v-container grid-list-md fluid text-cs-center fill-height pt-5 pb-5>
      <v-layout justify-center>
        <v-flex elevation-6 xs8>
          <v-toolbar flat tabs>
              <v-toolbar-title>Lender Details</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-tabs fixed-tabs slider-color="cyan" fluid color="grey lighten-3">
              <template v-for="lender in lenderData">
                <v-tab ripple>
                  {{lender.name}}
                </v-tab>
                <v-tab-item>
                  <v-tabs fixed-tabs slider-color="red" fluid color="grey lighten-5">
                    <v-tab>
                      Policy
                    </v-tab>
                    <template v-for="product in lender.products">
                      <v-tab ripple>
                        {{product.name}}
                      </v-tab>
                    </template>
                    <v-tab-item>
                      <v-layout justify-center>
                        <v-flex xs6>
                          <v-text-field v-model="lender.name" label="Name"></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout justify-center>
                        <v-flex xs3>
                          <v-text-field v-model="lender.maxLVRIncLMI" label="Max LVR Inc LMI"></v-text-field>
                        </v-flex>
                        <v-flex xs3>
                          <v-text-field v-model="lender.maxLVRExcLMI" label="Max LVR Exc LMI"></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout justify-center>
                        <v-flex xs3>
                          <v-text-field v-model="lender.assessmentRate" label="Assessment Rate"></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout justify-center>
                        <h3>Acceptable Security</h3>
                      </v-layout>
                      <v-layout justify-center>
                        <v-flex xs2>
                          <v-checkbox v-model="lender.acceptableSecurity.establishedDwelling" label="Established Dwelling" color="blue"></v-checkbox>
                        </v-flex>
                        <v-flex xs2>
                          <v-checkbox v-model="lender.acceptableSecurity.vacantLand" label="Vacant Land" color="blue"></v-checkbox>
                        </v-flex>
                        <v-flex xs2>
                          <v-checkbox v-model="lender.acceptableSecurity.construction" label="Construction" color="blue"></v-checkbox>
                        </v-flex>
                      </v-layout>
                      <v-layout justify-center>
                        <h3>Employment</h3>
                      </v-layout>
                      <v-layout justify-center>
                        <v-flex xs3>
                          <v-text-field v-model="lender.minMonthsInCasual" label="Min Months Casual"></v-text-field>
                        </v-flex>
                        <v-flex xs3>
                          <v-text-field v-model="lender.minMonthsInPartTime" label="Min Months Part Time"></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout justify-center>
                        <v-flex xs3>
                          <v-text-field v-model="lender.minMonthsInFullTime" label="Min Months Fulltime"></v-text-field>
                        </v-flex>
                        <v-flex xs3>
                          <v-text-field v-model="lender.minMonthsSelfEmployed" label="Min Months Self Employed"></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout justify-center>
                        <v-flex xs3>
                          <v-select :items="lenderDataOps.yesNo" v-model="lender.requiresGenuineSavings" label="Gen Savings?"></v-select>
                        </v-flex>
                      </v-layout>
                      <v-layout justify-center v-if="lender.requiresGenuineSavings=='Yes'">
                        <h3>Acceptable Genuine Savings</h3>
                      </v-layout>
                      <v-layout justify-center v-if="lender.requiresGenuineSavings=='Yes'">
                        <v-flex xs2>
                          <v-checkbox v-model="lender.acceptableGenuineSavings.savingsThreeMonths" label="3 Months Savings" color="blue"></v-checkbox>
                        </v-flex>
                        <v-flex xs2>
                          <v-checkbox v-model="lender.acceptableGenuineSavings.equityInProperty" label="Equity in Property" color="blue"></v-checkbox>
                        </v-flex>
                        <v-flex xs2>
                          <v-checkbox v-model="lender.acceptableGenuineSavings.taxReturn" label="Tax Return" color="blue"></v-checkbox>
                        </v-flex>
                      </v-layout>
                      <v-layout justify-center v-if="lender.requiresGenuineSavings=='Yes'">
                        <v-flex xs3>
                          <v-select :items="lenderDataOps.yesNo" v-model="lender.rentalPolicy" label="Rental Policy?"></v-select>
                        </v-flex>
                        <v-flex xs3 v-if="lender.rentalPolicy=='Yes'">
                          <v-text-field v-model="lender.minMonthsForRentalPolicy" label="Min Months Renting (REA)"></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout justify-center>
                        <h3>Monthly Living Expenses (Min)</h3>
                      </v-layout>
                      <v-layout justify-center>
                        <v-flex xs6>
                          <v-expansion-panel>
                            <v-expansion-panel-content v-for="i in lender.mle">
                              <div slot="header">{{i.name}}</div>
                              <v-card>
                                <v-layout justify-center>
                                  <v-flex xs4>
                                    <v-text-field v-model="i.fifty" label="$50,000"></v-text-field>
                                  </v-flex>
                                  <v-flex xs4>
                                    <v-text-field v-model="i.seventy" label="$70,000"></v-text-field>
                                  </v-flex>
                                </v-layout>
                                <v-layout justify-center>
                                  <v-flex xs4>
                                    <v-text-field v-model="i.ninety" label="$90,000"></v-text-field>
                                  </v-flex>
                                  <v-flex xs4>
                                    <v-text-field v-model="i.oneten" label="$110,000"></v-text-field>
                                  </v-flex>
                                </v-layout>
                                <v-layout justify-center>
                                  <v-flex xs4>
                                    <v-text-field v-model="i.onefifty" label="$150,000"></v-text-field>
                                  </v-flex>
                                  <v-flex xs4>
                                    <v-text-field v-model="i.twohundred" label="$200,000"></v-text-field>
                                  </v-flex>
                                </v-layout>
                                <v-layout justify-center>
                                  <v-flex xs4>
                                    <v-text-field v-model="i.threehundred" label="$300,000"></v-text-field>
                                  </v-flex>
                                </v-layout>
                              </v-card>
                            </v-expansion-panel-content>
                            <v-expansion-panel-content>
                              <div slot="header">Additional Dependents (>2)</div>
                              <v-card>
                                <v-layout justify-center>
                                  <v-flex xs4>
                                    <v-text-field v-model="lender.additionalDependents.single" label="Single"></v-text-field>
                                  </v-flex>
                                  <v-flex xs4>
                                    <v-text-field v-model="lender.additionalDependents.partnered" label="Partnered"></v-text-field>
                                  </v-flex>
                                </v-layout>
                              </v-card>
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                        </v-flex>
                      </v-layout>

                      <v-layout justify-center>
                        <h3>Servicing Buffer</h3>
                      </v-layout>
                      <v-layout justify-center>
                        <v-flex xs3>
                          <v-text-field v-model="lender.servicingBuffer.percent" label="Percent Buffer (%)"></v-text-field>
                        </v-flex>
                        <v-flex xs3>
                          <v-text-field v-model="lender.servicingBuffer.surplus" label="Surplus Required ($)"></v-text-field>
                        </v-flex>
                      </v-layout>
                      <v-layout justify-center>
                        <h3>Postcode Restrictions</h3>
                      </v-layout>
                      <v-layout justify-center>
                        <v-flex xs3>
                          <v-textarea v-model="lender.ninetyLVRPostcodes" label="90% Max. LVR Postcodes"></v-textarea>
                        </v-flex>
                        <v-flex xs3>
                          <v-textarea v-model="lender.eightyLVRPostcodes" label="80% Max. LVR Postcodes"></v-textarea>
                        </v-flex>
                      </v-layout>
                      <v-layout justify-center>
                        <v-flex xs3>
                          <v-textarea v-model="lender.seventyLVRPostcodes" label="70% Max. LVR Postcodes"></v-textarea>
                        </v-flex>
                        <v-flex xs3>
                          <v-textarea v-model="lender.unacceptablePostcodes" label="Unacceptable Postcodes"></v-textarea>
                        </v-flex>
                      </v-layout>
                    </v-tab-item>
                    <template v-for="product in lender.products">
                      <v-tab-item>
                        <v-layout justify-center>
                          <v-flex xs3>
                            <v-text-field type="text" v-model="product.name" label="Product Name"></v-text-field>
                          </v-flex>
                          <v-flex xs1>
                            <v-text-field type="number" v-model="product.interestRate" label="Interest Rate"></v-text-field>
                          </v-flex>
                        </v-layout>
                        <v-layout justify-center>
                          <v-flex xs2>
                            <v-text-field type="number" v-model="product.fixedRate" label="Fixed Rate"></v-text-field>
                          </v-flex>
                          <v-flex xs2>
                            <v-text-field type="number" v-model="product.fixedPeriod" label="Fixed Period"></v-text-field>
                          </v-flex>
                        </v-layout>
                        <v-layout justify-center>
                          <v-flex xs2>
                            <v-text-field type="number" v-model="product.introRate" label="Intro Rate"></v-text-field>
                          </v-flex>
                          <v-flex xs2>
                            <v-text-field type="number" v-model="product.introPeriod" label="Intro Period"></v-text-field>
                          </v-flex>
                        </v-layout>
                        <v-layout justify-center>
                          <v-flex xs2>
                            <v-checkbox v-model="product.ownerOccupied" label="Owner Occupied" color="blue"></v-checkbox>
                          </v-flex>
                          <v-flex xs2>
                            <v-checkbox v-model="product.investment" label="Investment" color="blue"></v-checkbox>
                          </v-flex>
                        </v-layout>
                        <v-layout justify-center>
                          <v-flex xs3>
                            <v-select :items="lenderDataOps.repaymentOptions" v-model="product.repaymentOptions" label="Repayment Options"></v-select>
                          </v-flex>
                        </v-layout>
                        <h2>Qualification</h2>
                        <v-layout justify-center>
                          <v-flex xs2>
                            <v-text-field type="number" v-model="product.maxLVRIncLMI" label="Max LVR inc LMI"></v-text-field>
                          </v-flex>
                          <v-flex xs2>
                            <v-text-field type="number" v-model="product.maxLVRExcLMI" label="Max LVR exc LMI"></v-text-field>
                          </v-flex>
                        </v-layout>
                        <v-layout justify-center>
                          <v-flex xs2>
                            <v-text-field type="number" v-model="product.minAmount" label="Min Loan Amount"></v-text-field>
                          </v-flex>
                          <v-flex xs2>
                            <v-text-field type="number" v-model="product.maxAmount" label="Max Loan Amount"></v-text-field>
                          </v-flex>
                        </v-layout>
                        <v-layout justify-center>
                          <v-flex xs2>
                            <v-select :items="lenderDataOps.yesNo" v-model="product.firstHomeBuyersOnly" label="First Home Buyers Only?"></v-select>
                          </v-flex>
                        </v-layout>
                        <h2>Fees</h2>
                        <v-layout justify-center>
                          <v-flex xs2>
                            <v-text-field type="number" v-model="product.upfrontFees" label="Upfront Fees"></v-text-field>
                          </v-flex>
                          <v-flex xs2>
                            <v-text-field type="number" v-model="product.monthlyFees" label="Monthly Fees"></v-text-field>
                          </v-flex>
                        </v-layout>
                        <v-layout justify-center>
                          <v-flex xs2>
                            <v-text-field type="number" v-model="product.annualFees" label="Annual Fees"></v-text-field>
                          </v-flex>
                          <v-flex xs2>
                            <v-text-field type="number" v-model="product.exitFees" label="Exit Fees"></v-text-field>
                          </v-flex>
                        </v-layout>
                        <h2>Features</h2>
                        <v-layout justify-center>
                          <v-flex xs2>
                            <v-select :items="lenderDataOps.yesNo" v-model="product.offsetAccount" label="Offset Account?"></v-select>
                          </v-flex>
                          <v-flex xs2>
                            <v-text-field type="number" v-model="product.offsetAccountFees" label="Offset Account Fees"></v-text-field>
                          </v-flex>
                        </v-layout>
                        <v-layout justify-center>
                          <v-flex xs2>
                            <v-select :items="lenderDataOps.yesNo" v-model="product.redraw" label="Redraw?"></v-select>
                          </v-flex>
                          <v-flex xs2>
                            <v-text-field type="number" v-model="product.redrawFee" label="Redraw Fees"></v-text-field>
                          </v-flex>
                        </v-layout>
                        <v-layout justify-center>
                          <v-flex xs2>
                            <v-text-field type="number" v-model="product.cashBack" label="Cashback"></v-text-field>
                          </v-flex>
                        </v-layout>
                        <v-layout justify-center>
                          <v-flex xs5>
                            <v-textarea name="notes-input" v-model="product.notes" label="Notes"></v-textarea>
                          </v-flex>
                        </v-layout>
                        <v-btn :loading="loading" :disabled="loading" color="error" @click.native="deleteProduct(product, lender)">DELETE PRODUCT</v-btn>
                      </v-tab-item>
                    </template>
                </v-tabs>
                  <v-btn :loading="loading" :disabled="loading" color="error" @click.native="deleteLender(lender)">Delete Lender</v-btn>
                  <v-btn :loading="loading" :disabled="loading" color="secondary" @click.native="createProduct(lender)">NEW PRODUCT</v-btn>
                </v-tab-item>
              </template>
            </v-tabs>
            <v-btn :loading="loading" :disabled="loading" color="secondary" @click.native="createLender">NEW LENDER</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
  </div>
</template>

<script>
import firebase from "firebase";
import { createHelpers } from "vuex-map-fields";

const { mapFields } = createHelpers({
  getterType: "lenderData/getField",
  mutationType: "lenderData/updateField"
});

export default {
  name: "Lenders",
  data() {
    return {
      loading: false
    };
  },
  computed: {
    ...mapFields(["lenderData", "lenderDataOps"])
  },
  methods: {
    createProduct: function(lender) {
      this.lenderData[this.lenderData.indexOf(lender)].products.push({
        name: "TBA",
        maxLVRExcLMI: 95,
        maxLVRIncLMI: 95,
        interestRate: 4.19,
        fixedRate: 0,
        fixedPeriod: 0,
        introRate: 0,
        introPeriod: 0,
        ownerOccupied: true,
        investment: false,
        repaymentOptions: "Principal & Interest Only",
        minAmount: 10000,
        maxAmount: 2000000,
        firstHomeBuyersOnly: "No",
        upfrontFees: 200,
        monthlyFees: 0,
        annualFees: 395,
        exitFees: 295,
        offsetAccount: "No",
        offsetAccountFees: 0,
        redraw: "Yes",
        redrawFee: 0,
        cashBack: 0,
        notes: "",
        proposedAmount: 200000,
        selected: false,
        eligible: false,
        ineligibleReasons: []
      });
      var vm = this;
      vm.$forceUpdate();
    },
    deleteProduct: function(product, lender) {
      this.lenderData[this.lenderData.indexOf(lender)].products.splice(
        this.lenderData[this.lenderData.indexOf(lender)].products.indexOf(
          product
        ),
        1
      );
      var vm = this;
      vm.$forceUpdate();
    },
    createLender: function() {
      this.lenderData.push({
        name: "TBA",
        maxLVRIncLMI: 80,
        maxLVRExcLMI: 80,
        assessmentRate: 7.25,
        acceptableSecurity: {
          establishedDwelling: true,
          vacantLand: true,
          construction: true
        },
        minMonthsInCasual: 12,
        minMonthsInPartTime: 6,
        minMonthsInFullTime: 6,
        minMonthsSelfEmployed: 24,
        requiresGenuineSavings: "Yes",
        acceptableGenuineSavings: {
          savingsThreeMonths: true,
          equityInProperty: true,
          taxReturn: false
        },
        mle: [
          {
            name: "Single No Dependents",
            fifty: 1354,
            seventy: 1457,
            ninety: 1785,
            oneten: 1876,
            onefifty: 2193,
            twohundred: 2430,
            threehundred: 3171
          },
          {
            name: "Single One Dependent",
            fifty: 1618,
            seventy: 1722,
            ninety: 2051,
            oneten: 2142,
            onefifty: 2460,
            twohundred: 2698,
            threehundred: 3443
          },
          {
            name: "Single Two Dependents",
            fifty: 1958,
            seventy: 2062,
            ninety: 2391,
            oneten: 2482,
            onefifty: 2800,
            twohundred: 3783,
            threehundred: 3783
          },
          {
            name: "Partnered No Dependents",
            fifty: 2218,
            seventy: 2322,
            ninety: 2651,
            oneten: 2741,
            onefifty: 3059,
            twohundred: 3297,
            threehundred: 4042
          },
          {
            name: "Partnered One Dependent",
            fifty: 2405,
            seventy: 2509,
            ninety: 2839,
            oneten: 2929,
            onefifty: 3247,
            twohundred: 3486,
            threehundred: 4231
          },
          {
            name: "Partnered Two Dependents",
            fifty: 2922,
            seventy: 3027,
            ninety: 3357,
            oneten: 3448,
            onefifty: 3767,
            twohundred: 4006,
            threehundred: 4753
          }
        ],
        additionalDependents: {
          single: 210, //single 3 dep on 50k is 2082
          partnered: 260
        },
        servicingBuffer: {
          percent: 5,
          surplus: 0
        },
        rentalPolicy: "No",
        minMonthsForRentalPolicy: 12,
        ninetyLVRPostcodes: ["0000", "1111"],
        eightyLVRPostcodes: ["2222", "3333"],
        seventyLVRPostcodes: ["4444", "5555"],
        unacceptablePostcodes: ["6666", "7777"],
        products: [],
        eligible: false,
        ineligibleReasons: []
      });
      var vm = this;
      vm.$forceUpdate();
    },
    deleteLender: function(lender) {
      this.lenderData.splice(this.lenderData.indexOf(lender), 1);
      var vm = this;
      vm.$forceUpdate();
    }
  },
  created: function() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  padding: 30px;
}
</style>
