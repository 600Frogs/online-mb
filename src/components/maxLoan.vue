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
  name: "maxLoan",
  data() {
    return {};
  },
  computed: {
    ...mapLenderFields(["lenderData", "lenderDataOps"]),
    ...mapUserFields(["userData", "userDataOps"])
  },
  methods: {
    calculateMaxLoan(lender, product) {
      let surplus = 0;
      surplus =
        this.calculateIncome(this.userData, product) -
        this.calculateExpenses(lender) -
        this.calculateLivingExpenses(lender, product) -
        this.calculateRent();
      if (this.userData.numberOfApplicants == "Two") {
        surplus += this.calculateIncome(this.userData.applicantTwo, product);
      }
      surplus -= parseInt(lender.servicingBuffer.surplus);
      if (surplus < 1) {
        return 0;
      }
      let interest = product.interestRate;
      if (interest < parseFloat(lender.assessmentRate)) {
        interest = parseFloat(lender.assessmentRate) / 100 / 12;
      } else {
        interest = interest / 100 / 12;
      }
      let payments = this.userData.proposedLoan.term * 12; //get the number of years to payback the loan
      let y = Math.pow(1 + interest, payments);
      let monthly = surplus;
      let principal = monthly * (y - 1) / (y * interest);
      if (
        !isNaN(principal) &&
        principal != Number.POSITIVE_INFINITY &&
        principal != Number.NEGATIVE_INFINITY
      ) {
        var x = principal;
      }

      x = x * (100 - lender.servicingBuffer.percent) / 100;
      x = Math.round(x);
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    calculateRent: function() {
      let rent = 0;
      if (
        this.userData.residential.currentArrangement ==
          "Renting through a Real Estate Agent" ||
        this.userData.residential.currentArrangement == "Renting - Privately" ||
        this.userData.residential.currentArrangement ==
          "Boarding i.e. with parents or family" ||
        this.userData.residential.currentArrangement == "Other"
      ) {
        rent = parseInt(this.userData.residential.weeklyRentPaid) * 52 / 12;
        rent = Math.max(rent, 650);
        if (
          this.userData.proposedLoan.propertyType == "Owner Occupied" &&
          this.userData.residential.rentingPostSettlement == "No"
        ) {
          rent = 0;
        }
      }
      return rent;
    },
    calculateAssessmentRepayments: function(
      principal,
      interest,
      assessmentRate,
      term,
      iOTerm
    ) {
      if (interest < assessmentRate) {
        interest = assessmentRate / 100 / 12;
      } else {
        interest = interest / 100 / 12;
      }
      let payments = (term - iOTerm) * 12; //get the number of years to payback the loan
      let y = Math.pow(1 + interest, payments);
      let monthly = principal * y * interest / (y - 1);
      if (
        !isNaN(monthly) &&
        monthly != Number.POSITIVE_INFINITY &&
        monthly != Number.NEGATIVE_INFINITY
      ) {
        return Math.round(monthly * 100) / 100;
      }
    },
    calculateExpenses(lender) {
      let expenses = 0;
      for (let i in this.userData.liabilities.additionalLiabilities) {
        let liability = this.userData.liabilities.additionalLiabilities[i];
        if (liability.type == "Credit Card") {
          expenses += parseInt(liability.limit * 0.03);
        } else if (liability.type == "Home Loan") {
          expenses += this.calculateAssessmentRepayments(
            liability.moneyOwing,
            liability.interestRate,
            parseFloat(lender.assessmentRate),
            liability.termRemaining,
            liability.iOTermRemaining
          );
        } else {
          expenses += parseInt(liability.monthlyPayments);
        }
      }
      return expenses;
    },
    calculateIncome(app, product) {
      let income = 0;
      let basewage = 0;
      let taxable = 0;
      let taxFree = 0;

      if (app.employment.baseWagePeriod == "Annually") {
        basewage = app.employment.baseWage;
      } else if (app.employment.baseWagePeriod == "Monthly") {
        basewage = app.employment.baseWage * 12;
      } else if (app.employment.baseWagePeriod == "Fortnightly") {
        basewage = app.employment.baseWage * 26;
      } else if (app.employment.baseWagePeriod == "Weekly") {
        basewage = app.employment.baseWage * 52;
      }

      if (app.employment.baseWageType == "Tax free income") {
        taxFree += parseFloat(basewage);
      } else {
        taxable += parseFloat(basewage);
      }

      //Additional incomes
      for (var i in app.income) {
        let inc = 0;
        if (app.income[i].period == "Annually") {
          inc = app.income[i].amount;
        } else if (app.income[i].period == "Monthly") {
          inc = app.income[i].amount * 12;
        } else if (app.income[i].period == "Fortnightly") {
          inc = app.income[i].amount * 26;
        } else if (app.income[i].period == "Weekly") {
          inc = app.income[i].amount * 52;
        }
        if (
          app.income[i].incomeType == "Overtime" ||
          app.income[i].incomeType == "Bonus/Commission" ||
          app.income[i].incomeType == "Rental Income" ||
          app.income[i].incomeType == "Expected Rental Return on Purchase" ||
          app.income[i].incomeType == "Other investment income" ||
          app.income[i].incomeType == "Second job PAYG" ||
          app.income[i].incomeType == "Other"
        ) {
          inc = inc * 0.8;
        }
        if (app.income[i].incomeInputType == "Tax free income") {
          taxFree += parseFloat(inc);
        } else {
          taxable += parseFloat(inc);
        }
      }

      //tax offset on investment loans
      let offsetInv = 0;
      if (this.userData.proposedLoan.propertyType == "Investment") {
        offsetInv = product.proposedAmount * product.interestRate / 200;
      }
      taxable -= parseFloat(offsetInv);

      //negative gearing
      let offsetLiab = 0;
      for (i in this.userData.liabilities.additionalLiabilities) {
        let liability = this.userData.liabilities.additionalLiabilities[i];
        if (liability.type != "Home Loan" || liability.taxDeductible != "Yes") {
          continue;
        }
        if (this.userData.numberOfApplicants == "One") {
          offsetLiab = liability.moneyOwing * liability.interestRate / 100;
        } else {
          if (liability.nameOnLoan == "Both") {
            offsetLiab = liability.moneyOwing * liability.interestRate / 200;
          } else if (liability.nameOnLoan == "Applicant One") {
            if (app.id == "Applicant One") {
              offsetLiab = liability.moneyOwing * liability.interestRate / 100;
            }
          } else {
            if (app.id == "Applicant Two") {
              offsetLiab = liability.moneyOwing * liability.interestRate / 100;
            }
          }
        }
      }
      taxable -= parseFloat(offsetLiab);

      //resolve taxable based on current brackets
      let tax = 0;
      if (taxable < 18200) {
        tax = 0;
      } else if (taxable < 37000) {
        tax = 0.19 * (taxable - 18200);
      } else if (taxable < 90000) {
        tax = 3572 + 0.325 * (taxable - 37000);
      } else if (taxable < 180000) {
        tax = 20797 + 0.37 * (taxable - 90000);
      } else {
        tax = 54097 + 0.45 * (taxable - 180000);
      }
      //medicare levy
      if (taxable > 21980) {
        tax += parseFloat(taxable) * 0.02;
      }
      //low and middle income tax offset
      if (taxable < 37000) {
        tax -= 200;
      } else if (taxable < 48000) {
        tax -= 200 + 0.03 * (taxable - 37000);
      } else if (taxable < 90000) {
        tax -= 530;
      } else if (taxable < 125334) {
        tax -= 530 - 0.015 * (taxable - 90000);
      }
      if (tax < 0) {
        tax = 0;
      }

      //resolve and return
      income =
        -parseFloat(tax) +
        parseFloat(taxFree) +
        parseFloat(taxable) +
        parseFloat(offsetLiab) +
        parseFloat(offsetInv);
      return income / 12;
    },
    calculateLivingExpenses(lender, product) {
      let hem = 0;
      let app1 = this.userData;
      let app2 = this.userData.applicantTwo;
      let finder;
      let mle;
      let income = this.calculateIncome(app1, product) * 12;
      if (
        app1.numberOfApplicants == "Two" &&
        app2.partnerOfApplicantOne == "Yes"
      ) {
        income += this.calculateIncome(app2, product) * 12;
      }
      if (
        app1.relationshipStatus == "Single" ||
        app1.relationshipStatus == "Recently Divorced"
      ) {
        finder = 0;
      } else {
        finder = 3;
      }
      mle = lender.mle[finder + Math.min(2, parseInt(app1.numberOfDependents))];
      if (income <= 42000) {
        hem = parseInt(mle.fifty);
      } else if (income <= 55000) {
        hem = parseInt(mle.seventy);
      } else if (income <= 75000) {
        hem = parseInt(mle.ninety);
      } else if (income <= 90000) {
        hem = parseInt(mle.oneten);
      } else if (income <= 120000) {
        hem = parseInt(mle.onefifty);
      } else if (income <= 150000) {
        hem = parseInt(mle.twohundred);
      } else {
        hem = parseInt(mle.threehundred);
      }

      if (
        app1.numberOfApplicants == "Two" &&
        app2.partnerOfApplicantOne == "No"
      ) {
        let income = this.calculateIncome(app2, product) * 12;
        if (
          app2.relationshipStatus == "Single" ||
          app2.relationshipStatus == "Recently Divorced"
        ) {
          finder = 0;
        } else {
          finder = 3;
        }
        mle = lender.mle[finder];
        if (income <= 42000) {
          //net figures
          hem += parseInt(mle.fifty);
        } else if (income <= 55000) {
          hem += parseInt(mle.seventy);
        } else if (income <= 75000) {
          hem += parseInt(mle.ninety);
        } else if (income <= 90000) {
          hem += parseInt(mle.oneten);
        } else if (income <= 120000) {
          hem += parseInt(mle.onefifty);
        } else if (income <= 150000) {
          hem += parseInt(mle.twohundred);
        } else {
          hem += parseInt(mle.threehundred);
        }
      }

      if (app1.numberOfDependents > 2) {
        if (app1.numberOfApplicants == "One") {
          hem += parseInt(lender.additionalDependents.single);
        } else {
          hem += parseInt(lender.additionalDependents.partnered);
        }
      }
      return Math.max(
        hem,
        this.userData.liabilities.livingExpenses.basicLivingExpenses
      );
    },
    calculateMonths(date) {
      let dateStarted = new Date(date);
      let todaysDate = new Date();
      let timeDiff = Math.abs(todaysDate.getTime() - dateStarted.getTime());
      let daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return daysDiff;
    }
  },
  watch: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
