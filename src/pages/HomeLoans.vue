<template>
  <div id="homeLoans">
    <h1>Home Loans</h1>
    <v-container grid-list-md fluid text-cs-center>
      <v-layout  row wrap justify-center>
        <v-flex xs1>
          <v-text-field type="number" step="10000" v-model="userData.proposedLoan.purchasePrice" label="Purchase Price"></v-text-field>
        </v-flex>
        <v-flex xs1>
          <v-text-field type="number" step="1000" v-model="userData.proposedLoan.deposit" label="Deposit/Equity"></v-text-field>
        </v-flex>
        <v-flex xs1>
          <v-text-field type="number" step="1" ref="termField" v-model="userData.proposedLoan.term" label="Term (years)"></v-text-field>
        </v-flex>
        <v-flex xs1>
          <p>Loan to Value Ratio: {{LVR}}%</p>
        </v-flex>
      </v-layout>
      <v-layout  row wrap justify-center>
        <v-flex xs2>
          <v-select :items="userDataOps.propertyType" v-model="userData.proposedLoan.propertyType" label="Property Type"></v-select>
        </v-flex>
        <v-flex xs2>
          <v-select :items="userDataOps.securityType" v-model="userData.proposedLoan.securityType" label="Security"></v-select>
        </v-flex>
        <v-flex xs1>
          <v-text-field type="number" step="disabled" v-model="userData.proposedLoan.postcode" label="Postcode"></v-text-field>
        </v-flex>
      </v-layout>
      <maxLoan ref="maxLoan"></maxLoan>
      <h2>Filters</h2>
        <v-layout  row wrap justify-center>
          <v-flex xs3>
            <v-switch label="Only Show Loan I'm Eligible For" v-model="eligibleFilter" color="blue"></v-switch>
          </v-flex>
          <v-flex xs2>
            <v-select :items="lenderDataOps.loanType" v-model="typeFilter" label="Type of Loan"></v-select>
          </v-flex>
        </v-layout>
        <v-layout  row wrap justify-center>
          <v-flex xs2>
            <v-checkbox label="No Upfront Fees" v-model="noUpfrontFeesFilter" color="blue"></v-checkbox>
          </v-flex>
          <v-flex xs2>
            <v-checkbox label="No Ongoing Fees" v-model="noOngoingFeesFilter" color="blue"></v-checkbox>
          </v-flex>
          <v-flex xs2>
            <v-checkbox label="Must Have Offset" v-model="offsetFilter" color="blue"></v-checkbox>
          </v-flex>
          <v-flex xs2>
            <v-checkbox label="Must Have Redraw" v-model="redrawFilter" color="blue"></v-checkbox>
          </v-flex>
        </v-layout>
    </v-container>
    <v-btn :loading="loading" :disabled="loading" color="secondary" @click.native="updateData">Update</v-btn
    <v-container grid-list-md fluid text-cs-center>
      <v-layout  row wrap justify-center>
        <v-data-table
          :headers="headers"
          :items="items"
          hide-actions
          class="elevation-1"
          ref="homeLoanTable"
        >
          <template slot="items" slot-scope="props">
              <td><v-checkbox :input-value="props.selected" color="blue" hide-details ></v-checkbox></td>
              <td>
                <v-icon color="red" class="validationIcon" v-if="!props.item.eligible">highlight_off</v-icon>
                <v-icon color="green" class="validationIcon" v-else>check_circle</v-icon>
              </td>
              <td><v-text-field class="tabelTextField" prefix="$" v-on:input="updateProposedAmount(props)" type="number" step="10000" v-model="props.item.proposedAmount"></v-text-field></td>
              <td>${{props.item.maxLoan}}</td>
              <td>
                <span v-if="props.item.fixedRate>0">{{props.item.fixedRate}}%<br>Fixed for {{props.item.fixedPeriod}} Years<br></span>
                <span v-else-if="props.item.introRate>0">{{props.item.introRate}}%<br>Intro for {{props.item.introPeriod}} Years</span>
                <span v-else>N/A</span>
              </td>
              <td>{{props.item.interestRate}}%</td>
              <td>
                <span v-if="props.item.fixedRate>0">Fixed: ${{props.item.fixedRepayments}}<br></span>
                <span v-if="props.item.introRate>0">Intro: ${{props.item.introRepayments}}<br></span>
                ${{props.item.repayments}}
                <span v-if="props.item.fixedRate>0||props.item.introRate>0"> Thereafter</span>
              </td>
              <td>${{props.item.upfrontFees}}</td>
              <td>
                <span v-if="props.item.annualFees!=0 && props.item.monthlyFees!=0">${{props.item.annualFees}} p.a.<br>${{props.item.monthlyFees}} p.m.</span>
                <span v-else-if="props.item.annualFees!=0">${{props.item.annualFees}} p.a.</span>
                <span v-else-if="props.item.monthlyFees!=0">${{props.item.monthlyFees}} p.m.</span>
                <span v-else>$0</span>
              </td>
              <td>
                <v-icon color="red" class="validationIcon" v-if="props.item.offsetAccount=='No'">highlight_off</v-icon>
                <v-icon color="green" class="validationIcon" v-else>check_circle</v-icon>
              </td>
              <td>
                <v-icon color="red" class="validationIcon" v-if="props.item.redraw=='No' || props.item.redrawFee!=0">highlight_off</v-icon>
                <v-icon color="green" class="validationIcon" v-else>check_circle</v-icon>
              </td>
          </template>
        </v-data-table>
      </v-layout>
    </v-container>
    >
    <filterHomeLoans ref="filterHomeLoans"></filterHomeLoans>
  </div>
</template>

<script>
import firebase from 'firebase'
import { createHelpers } from 'vuex-map-fields'
import filterHomeLoans from '@/components/filterHomeLoans'
import maxLoan from '@/components/maxLoan'

const { mapFields: mapLenderFields } = createHelpers({
  getterType: 'lenderData/getField',
  mutationType: 'lenderData/updateField',
});
const { mapFields: mapUserFields } = createHelpers({
  getterType: 'getField',
  mutationType: 'updateField',
});

export default {
  name: 'HomeLoans',
  data () {
    return {
      eligibleFilter: true,
      loading: false,
      noUpfrontFeesFilter: false,
      noOngoingFeesFilter: false,
      offsetFilter: false,
      redrawFilter: false,
      typeFilter: "All",
      headers: [
       { text: 'Select', sortable: false, value: 'selected' },
       { text: 'Eligible', value: 'eligible' },
       { text: 'Proposed Loan', value: 'proposedLoan'},
       { text: 'Est. Max Loan', value: 'maxLoan'},
       { text: 'Fixed/Intro Rate', value: 'fixedRate'},
       { text: 'Interest Rate', value: 'interestRate' },
       { text: 'Monthly Repayments', value: 'lowestRepayment' },
       { text: 'Upfront Fees', value: 'upfrontFees' },
       { text: 'Ongoing Fees', value: 'annualFees' },
       { text: 'Offset Account', value: 'offsetAccount' },
       { text: 'Free Redraw', value: 'redraw' },
    ],
    items:[]
    }
  },
  components: {
    filterHomeLoans,
    maxLoan
  },
  computed: {
    ...mapLenderFields([
      'lenderData',
      'lenderDataOps'
    ]),
    ...mapUserFields([
      'userData',
      'userDataOps'
    ]),
    LVR() {
      var loanAmount = this.userData.proposedLoan.purchasePrice - this.userData.proposedLoan.deposit;
      var lvr = 100*loanAmount/this.userData.proposedLoan.purchasePrice;
      return Math.round(lvr*100)/100;
    },
    authenticated() {
      return this.$store.state.authenticated;
    },
  },
  methods: {

      updateData: function() {
          var vm = this;
          vm.loading=true;
          vm.$refs.filterHomeLoans.filter();
          var products = [];
          for (var lender in this.lenderData) {
            for (var i in this.lenderData[lender].products) {
              var product = this.lenderData[lender].products[i];
              if (this.userData.proposedLoan.propertyType=="Owner Occupied"&&!product.ownerOccupied){continue;}
              if (this.userData.proposedLoan.propertyType=="Investment"&&!product.investment){continue;}
              if (this.eligibleFilter == true && !product.eligible ) {continue;}
              if (this.typeFilter == 'Variable Only' && product.fixedPeriod>0) {continue;}
              if (this.typeFilter == 'Fixed Only' && product.fixedPeriod<1) {continue;}
              if (this.noUpfrontFeesFilter == true && product.upfrontFees !=0 ) {continue;}
              if (this.noOngoingFeesFilter == true && (product.monthlyFees != 0 || product.annualFees!=0 )) {continue;}
              if (this.offsetFilter == true && product.offsetAccount == 'No') {continue;}
              if (this.redrawFilter == true && product.redraw == 'No' ) {continue;}
              products.push({
                "lenderRef":lender,
                "productsRef":i,
                "expanded":false,
                "selected":product.selected,
                "eligible":product.eligible,
                "proposedAmount":product.proposedAmount,
                "fixedRate":product.fixedRate,
                "fixedPeriod":product.fixedPeriod,
                "introRate":product.introRate,
                "introPeriod":product.introPeriod,
                "interestRate":product.interestRate,
                "maxLoan":vm.$refs.maxLoan.calculateMaxLoan(this.lenderData[lender], product),
                "repayments":this.calculateRepayments(product, "variable"),
                "fixedRepayments":this.calculateRepayments(product, "fixed"),
                "introRepayments":this.calculateRepayments(product, "intro"),
                "lowestRepayment":this.lowestRepayment(product),
                "upfrontFees":product.upfrontFees,
                "monthlyFees":product.monthlyFees,
                "annualFees":product.annualFees,
                "exitFees":product.exitFees,
                "offsetAccount":product.offsetAccount,
                "offsetAccountFees":product.offsetAccountFees,
                "redraw":product.redraw,
                "redrawFee":product.redrawFee,
                "minAmount":product.minAmount,
                "maxAmount":product.maxAmount,
                "cashBack":product.cashBack,
                "notes":product.notes
              })
            }
          }

          this.items=products;
          vm.loading=false;
          vm.$forceUpdate();
      },
      calculateRepayments: function (product, type){
          var principal= product.proposedAmount; //Get the input principal amount
          var interest = product.interestRate/100/12;

          var payments = this.userData.proposedLoan.term*12;

          if (type=='fixed' || product.fixedPeriod>0){
            interest = product.fixedRate/100/12;
          }
          if (type=='intro'|| product.introPeriod>0){
            interest = product.introRate/100/12;
          }

          var x = Math.pow(1+interest, -payments);
          var monthly = (principal*interest)/(1-x);
          if (type=='variable' && (product.fixedRate>0 || product.introRate>0)){
            var remainingPayments = payments-product.fixedPeriod*12-product.introPeriod*12;
            var y = Math.pow(1+interest, -remainingPayments);
            var pV = (monthly*(1-y))/interest;
            interest = product.interestRate/100/12;
            y = Math.pow(1+interest, -remainingPayments);
            monthly = (pV*interest)/(1-y);
          }

          if(!isNaN(monthly) &&
              (monthly != Number.POSITIVE_INFINITY)&&
              (monthly != Number.NEGATIVE_INFINITY)){

                  return Math.round(monthly*100)/100;
                  }
      },
      updateProposedAmount: function(props){
        this.lenderData[props.item.lenderRef].products[props.item.productsRef].proposedAmount=props.item.proposedAmount;
      },
      defaultProposedAmount: function() {
        this.userData.proposedLoan.amount = this.userData.proposedLoan.purchasePrice - this.userData.proposedLoan.deposit;
        for (var i in this.lenderData){
          for (var j in this.lenderData[i].products){
            this.lenderData[i].products[j].proposedAmount = this.userData.proposedLoan.amount;
          }
        }
      },
      lowestRepayment: function(product){
        var variable = this.calculateRepayments(product, "variable");
        var fixed;
        var intro;
        if (product.fixedPeriod>0){
          fixed=this.calculateRepayments(product, "fixed")
        } else {
          fixed = 10000000;
        }
        if (product.introPeriod>0){
          intro=this.calculateRepayments(product, "intro")
        } else {
          intro = 10000000;
        }
        return Math.min(variable, fixed, intro);
      }

  },
  mounted: function() {
    this.defaultProposedAmount();
    this.updateData();
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  td{padding: 0px 8px;}
  .tabelTextField{max-width:100px;}
</style>
