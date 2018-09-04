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
      let loanAmount =
        this.userData.proposedLoan.purchasePrice -
        this.userData.proposedLoan.deposit;
      let lvr = 100 * loanAmount / this.userData.proposedLoan.purchasePrice;
      return Math.round(lvr * 100) / 100;
    }
  },
  methods: {
    filter: function() {
      for (let j in this.lenderData) {
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
        let daysInEmploy = this.calculateMonths(
          this.userData.employment.dateStarted
        );
        //Check products
        for (let i in this.lenderData[j].products) {
          this.lenderData[j].products[i].eligible = true;
          if (this.lenderData[j].eligible == false) {
            this.lenderData[j].products[i].eligible = false;
          }
        }
      }
    },
    calculateMonths(date) {
      let dateStarted = new Date(date);
      let todaysDate = new Date();
      let timeDiff = Math.abs(todaysDate.getTime() - dateStarted.getTime());
      let daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return daysDiff;
    },
    calculateRepayments: function(product) {
      let principal = product.proposedAmount; //Get the input principal amount
      let interest = product.interestRate / 100 / 12; //Get the input interest amnount
      let payments = 30 * 12; //get the number of years to payback the loan
      let y = Math.pow(1 + interest, payments);
      let monthly = principal * y * interest / (y - 1);
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
