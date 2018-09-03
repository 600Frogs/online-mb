<template>
  <div>
  </div>
</template>

<script>
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
  name: "filterHomeLoans",
  data() {
    return {};
  },
  computed: {
    ...mapLenderFields(["lenderData", "lenderDataOps"]),
    ...mapUserFields(["userData", "userDataOps"]),
    LVR() {
      var loanAmount =
        this.userData.proposedLoan.purchasePrice -
        this.userData.proposedLoan.deposit;
      var lvr = 100 * loanAmount / this.userData.proposedLoan.purchasePrice;
      return Math.round(lvr * 100) / 100;
    }
  },
  methods: {
    filter: function() {
      for (var j in this.lenderData) {
        this.lenderData[j].eligible = true;
        //check lender Policy
        if (this.LVR > this.lenderData[j].maxLVRExcLMI) {
          this.lenderData[j].eligible = false;
        }
        if (
          (this.userData.proposedLoan.securityType == "Established House" ||
            this.userData.proposedLoan.securityType == "New House") &&
          this.lenderData[j].acceptableSecurity.establishedDwelling == false
        ) {
          this.lenderData[j].eligible = false;
        }
        if (
          this.userData.proposedLoan.securityType == "Vacant Land" &&
          this.lenderData[j].acceptableSecurity.vacantLand == false
        ) {
          this.lenderData[j].eligible = false;
        }
        if (
          this.userData.proposedLoan.securityType == "Construction" &&
          this.lenderData[j].acceptableSecurity.construction == false
        ) {
          this.lenderData[j].eligible = false;
        }
        var daysInEmploy = this.calculateMonths(
          this.userData.employment.dateStarted
        );
        //Check products
        for (var i in this.lenderData[j].products) {
          this.lenderData[j].products[i].eligible = true;
          if (this.lenderData[j].eligible == false) {
            this.lenderData[j].products[i].eligible = false;
          }
        }
      }
    },
    calculateMonths(date) {
      var dateStarted = new Date(date);
      var todaysDate = new Date();
      var timeDiff = Math.abs(todaysDate.getTime() - dateStarted.getTime());
      var daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return daysDiff;
    },
    calculateRepayments: function(product) {
      var principal = product.proposedAmount; //Get the input principal amount
      var interest = product.interestRate / 100 / 12; //Get the input interest amnount
      var payments = 30 * 12; //get the number of years to payback the loan
      var y = Math.pow(1 + interest, payments);
      var monthly = principal * y * interest / (y - 1);
      if (
        !isNaN(monthly) &&
        monthly != Number.POSITIVE_INFINITY &&
        monthly != Number.NEGATIVE_INFINITY
      ) {
        console.log(Math.round(monthly * 100) / 100);
      }
    }
  },
  watch: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
