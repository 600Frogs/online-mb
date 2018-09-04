<template>
  <div >
    <h1>Cost to Purchase</h1>
    <v-container grid-list-md fluid text-cs-center>
      <v-layout  row wrap justify-center>
        <v-flex xs2>
          <v-text-field type="number" step="10000" v-model="userData.proposedLoan.purchasePrice" label="Purchase Price"></v-text-field>
        </v-flex>
        <v-flex xs2>
          <v-text-field type="number" step="1" v-model="userData.proposedLoan.deposit" label="Deposit"></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap justify-center>
        <v-flex xs4>
          <v-slider v-model="userData.proposedLoan.deposit" :max="userData.proposedLoan.purchasePrice" :min="0" :label="percent"></v-slider>
        </v-flex>
      </v-layout>
      <v-layout row wrap justify-center>
        <v-flex xs4>
          <span v-if="lessThanFivePercent">5% deposit minimum unless using a security guarantor</span>
        </v-flex>
      </v-layout>
      <v-layout  row wrap justify-center>
        <v-flex xs2>
          <v-select :items="userDataOps.states" v-model="userData.proposedLoan.state" label="State" :disabled="true"></v-select>
        </v-flex>
        <v-flex xs2>
          <v-select :items="userDataOps.propertyType" v-model="userData.proposedLoan.propertyType" label="Property Type"></v-select>
        </v-flex>
      </v-layout>
      <v-layout  row wrap justify-center>
        <v-flex xs2>
          <v-select :items="userDataOps.yesNo" v-model="userData.proposedLoan.firstHomeBuyer" label="First Home Buyer"></v-select>
        </v-flex>
        <v-flex xs2>
          <v-select :items="userDataOps.securityType" v-model="userData.proposedLoan.securityType" label="Security"></v-select>
        </v-flex>
      </v-layout>

    </v-container>
    <h2>Government Charges</h2>
    <v-container grid-list-md fluid text-cs-center>
      <v-layout  row wrap justify-center>
        <v-flex xs2>Stamp Duty</v-flex>
        <v-flex xs2>${{stampDuty}}</v-flex>
      </v-layout>
      <v-layout  row wrap justify-center>
        <v-flex xs2>Mortgage Registration</v-flex>
        <v-flex xs2>${{mortgageRegistration}}</v-flex>
      </v-layout>
      <v-layout  row wrap justify-center>
        <v-flex xs2>Transfer Duty</v-flex>
        <v-flex xs2>${{transferDuty}}</v-flex>
      </v-layout>
      <v-layout  row wrap justify-center>
        <v-flex xs2><strong>Total Government Charges</strong></v-flex>
        <v-flex xs2><strong>${{stampDuty + mortgageRegistration + transferDuty}}</strong></v-flex>
      </v-layout>
    </v-container>
    <h2>Bank Charges</h2>
    <v-container grid-list-md fluid text-cs-center>
      <v-layout  row wrap justify-center>
        <v-flex xs2>Deposit</v-flex>
        <v-flex xs2>${{deposit}}</v-flex>
      </v-layout>
      <v-layout  row wrap justify-center>
        <v-flex xs2>Application Fees</v-flex>
        <v-flex xs2>Unascertainable</v-flex>
      </v-layout>
      <v-layout  row wrap justify-center>
        <v-flex xs2><strong>Total Bank Charges</strong></v-flex>
        <v-flex xs2><strong>${{deposit}}</strong></v-flex>
      </v-layout>
    </v-container>
    <h2>Other Fees</h2>
    <v-container grid-list-md fluid text-cs-center>
      <v-layout  row wrap justify-center>
        <v-flex xs2>Solicitor (Est)</v-flex>
        <v-flex xs2>$1700</v-flex>
      </v-layout>
      <v-layout  row wrap justify-center>
        <v-flex xs2>Building & Pest (Est)</v-flex>
        <v-flex xs2>$600</v-flex>
      </v-layout>
      <v-layout  row wrap justify-center>
        <v-flex xs2><strong>Total Other Charges</strong></v-flex>
        <v-flex xs2><strong>$2300</strong></v-flex>
      </v-layout>
    </v-container>
    <h2>Total Cost: ${{2300 + deposit + stampDuty + mortgageRegistration + transferDuty}}</h2>
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import firebase from "firebase";

export default {
  name: "CostToPurchase",
  data() {
    return {
      loading: false,
      charges: [{}]
    };
  },
  components: {},
  methods: {},
  computed: {
    deposit() {
      return this.userData.proposedLoan.deposit;
    },
    mortgageRegistration() {
      let value = "Error calculating.";
      switch (this.userData.proposedLoan.state) {
        case "Australian Capital Territory":
          value = "ACTY";
          break;
        case "Queensland":
          value = 187;
      }
      return value;
    },
    transferDuty() {
      return 0;
    },
    vacantLandConcession() {
      let value = "Error calculating.";
      let purchasePrice = this.userData.proposedLoan.purchasePrice;
      switch (this.userData.proposedLoan.state) {
        case "Australian Capital Territory":
          value = "ACTY";
          break;
        case "Queensland":
          if (purchasePrice < 250000) {
            value = 1000000;
          } else if (purchasePrice < 260000) {
            value = 7175;
          } else if (purchasePrice < 270000) {
            value = 6700;
          } else if (purchasePrice < 280000) {
            value = 6225;
          } else if (purchasePrice < 290000) {
            value = 5750;
          } else if (purchasePrice < 300000) {
            value = 5275;
          } else if (purchasePrice < 310000) {
            value = 4800;
          } else if (purchasePrice < 320000) {
            value = 4325;
          } else if (purchasePrice < 330000) {
            value = 3850;
          } else if (purchasePrice < 340000) {
            value = 3375;
          } else if (purchasePrice < 350000) {
            value = 2900;
          } else if (purchasePrice < 360000) {
            value = 2425;
          } else if (purchasePrice < 370000) {
            value = 1950;
          } else if (purchasePrice < 380000) {
            value = 1475;
          } else if (purchasePrice < 390000) {
            value = 1000;
          } else if (purchasePrice < 400000) {
            value = 525;
          } else {
            value = 0;
          }
          break;
      }
      if (this.userData.proposedLoan.propertyType !== "Owner Occupied")
        return 0;
      if (this.userData.proposedLoan.firstHomeBuyer !== "Yes") return 0;
      if (this.userData.proposedLoan.securityType !== "Vacant Land") return 0;
      return Math.round(value * 100) / 100;
    },
    firstHomeConcession() {
      let value = "Error calculating.";
      let purchasePrice = this.userData.proposedLoan.purchasePrice;
      switch (this.userData.proposedLoan.state) {
        case "Australian Capital Territory":
          value = "ACTY";
          break;
        case "Queensland":
          if (purchasePrice < 505000) {
            value = 8750;
          } else if (purchasePrice < 510000) {
            value = 7875;
          } else if (purchasePrice < 515000) {
            value = 7000;
          } else if (purchasePrice < 520000) {
            value = 6125;
          } else if (purchasePrice < 525000) {
            value = 5250;
          } else if (purchasePrice < 530000) {
            value = 4375;
          } else if (purchasePrice < 535000) {
            value = 3500;
          } else if (purchasePrice < 540000) {
            value = 2625;
          } else if (purchasePrice < 545000) {
            value = 1750;
          } else if (purchasePrice < 550000) {
            value = 875;
          } else {
            value = 0;
          }
          if (this.userData.proposedLoan.propertyType !== "Owner Occupied")
            return 0;
          if (this.userData.proposedLoan.firstHomeBuyer !== "Yes") return 0;
          if (this.userData.proposedLoan.securityType == "Vacant Land")
            return 0;
          break;
      }

      return Math.round(value * 100) / 100;
    },
    homeConcession() {
      let value = "Error calculating.";
      let purchasePrice = this.userData.proposedLoan.purchasePrice;
      switch (this.userData.proposedLoan.state) {
        case "Australian Capital Territory":
          value = "ACTY";
          break;
        case "Queensland":
          if (purchasePrice <= 350000) {
            value = purchasePrice * 0.01;
          } else if (purchasePrice <= 540000) {
            let x = Math.ceil((purchasePrice - 350000) / 100) * 100;
            value = 3500 + 0.035 * x;
          } else if (purchasePrice <= 1000000) {
            let x = Math.ceil((purchasePrice - 540000) / 100) * 100;
            value = 10150 + 0.045 * x;
          } else {
            let x = Math.ceil((purchasePrice - 1000000) / 100) * 100;
            value = 30850 + 0.0575 * x;
          }
          if (this.userData.proposedLoan.propertyType !== "Owner Occupied") {
            return 0;
          }
          break;
        case 2:
          value = "Tab 2";
      }

      return Math.round(value * 100) / 100;
    },
    stampDuty() {
      let value = "Error calculating.";
      let purchasePrice = this.userData.proposedLoan.purchasePrice;
      switch (this.userData.proposedLoan.state) {
        case "Australian Capital Territory":
          value = "ACTY";
          break;
        case "Queensland":
          if (purchasePrice <= 5000) {
            value = 0;
          } else if (purchasePrice <= 75000) {
            let x = Math.ceil((purchasePrice - 5000) / 100) * 100;
            value = 0.015 * x;
          } else if (purchasePrice <= 540000) {
            let x = Math.ceil((purchasePrice - 75000) / 100) * 100;
            value = 1050 + 0.035 * x;
          } else if (purchasePrice <= 1000000) {
            let x = Math.ceil((purchasePrice - 540000) / 100) * 100;
            value = 17325 + 0.045 * x;
          } else {
            let x = Math.ceil((purchasePrice - 1000000) / 100) * 100;
            value = 38025 + 0.0575 * x;
          }
          if (
            this.userData.proposedLoan.propertyType == "Owner Occupied" &&
            this.userData.proposedLoan.securityType !== "Vacant Land"
          ) {
            value = this.homeConcession;
          }
          value = value - this.firstHomeConcession - this.vacantLandConcession;
          break;
        case 2:
          value = "Tab 2";
      }

      if (value < 0) {
        value = 0;
      }
      return Math.round(value * 100) / 100;
    },

    authenticated() {
      return this.$store.state.authenticated;
    },
    ...mapFields(["userData", "userDataOps"]),
    percent() {
      return (
        Math.round(
          this.userData.proposedLoan.deposit /
            this.userData.proposedLoan.purchasePrice *
            100
        ) + "% Deposit"
      );
    },
    lessThanFivePercent() {
      return (
        this.userData.proposedLoan.deposit /
          this.userData.proposedLoan.purchasePrice *
          100 <=
        5
      );
    }
  },
  created: function() {}
};
</script>

<style scoped>
</style>
