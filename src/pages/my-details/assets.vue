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
                    <v-flex xs4>
                      <v-text-field type="number" step="1000" v-model="userData.assets.depositAvailable" label="Funds/equity available for home loan"></v-text-field>
                      <span v-if="userData.assets.depositAvailable<1"><p class="validationError">Please enter an amount more than zero</p></span>
                    </v-flex>
                    <v-flex xs5>
                      <v-select :items="userDataOps.sourceOfDeposit" v-model="userData.assets.sourceOfDeposit" label="Source of funds"></v-select>
                      <span v-if="!userData.assets.sourceOfDeposit"><p class="validationError">Please select an answer</p></span>
                    </v-flex>
                  </v-layout>
                  <v-layout  row wrap justify-center>
                    <p class="pushDown">Please enter 20% of the purchase price if applying for a guarantor loan</p>
                  </v-layout>
                  <v-layout v-if="showRealEstate==true" row wrap justify-center>
                    <v-flex xs8>
                      <v-select :items="userDataOps.yesNo" v-model="userData.assets.rentedOverTwelveMonths" label="Have you rented through a Real Estate Agent for the last 12 months?"></v-select>
                    </v-flex>
                  </v-layout>
                  <v-divider></v-divider>
                </v-container>
                <v-container grid-list-md fluid text-cs-center v-for='(assets, index) in this.userData.assets.additionalAssets'>
                    <v-layout justify-center row wrap>
                      <v-flex xs3>
                        <v-select :items="userDataOps.typeOfAsset" v-model="userData.assets.additionalAssets[index].assetType" label="Asset"></v-select>
                      </v-flex>
                      <v-flex v-if="userData.assets.additionalAssets[index].assetType=='Other'"xs3>
                        <v-text-field type="text" v-model="userData.assets.additionalAssets[index].notes" label="Details"></v-text-field>
                      </v-flex>
                      <v-flex xs2>
                        <v-text-field type="number" step="1000" v-model="userData.assets.additionalAssets[index].value" label="Value"></v-text-field>
                      </v-flex>
                      <v-flex xs4 v-if="userData.assets.additionalAssets[index].assetType=='Real Estate'">
                        <v-text-field type="text" v-model="userData.assets.additionalAssets[index].address" label="Address"></v-text-field>
                      </v-flex>
                      <v-flex xs1>
                        <v-btn color="error" @click.native="removeAsset(index)">Remove</v-btn>
                      </v-flex>
                      </v-layout>

                      <v-divider></v-divider>

                </v-container>
                <v-btn color="primary" @click.native="addAsset">Add Asset</v-btn>
              </v-form>
            </v-card>
          </v-tab-item>

      </v-tabs>


  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'assets',
  data () {
    return {
      active: null,
      modalDOB: null
    }
  },
  computed: {
    ...mapFields([
      'userData',
      'userDataOps'
    ]),
    showApplicantTwo() {
      if (this.userData.numberOfApplicants == "Two") {
        return true;
      } else {
        return false;
      }
    },
    showRealEstate() {
      if (this.userData.assets.sourceOfDeposit == 'Savings - held for less than 3 months' || this.userData.assets.sourceOfDeposit == 'Gift from parents') {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    addAsset: function() {
      this.$store.commit('addAsset', "I'm not important! ");
    },
    removeAsset: function(i) {
      this.$store.commit('removeAsset', i);
    },
    addAsset2: function() {
      this.$store.commit('addAsset2', "I'm not important! ");
    },
    removeAsset2: function(i) {
      this.$store.commit('removeAsset2', i);
    },
    validate: function() {
      if (this.userData.assets.depositAvailable<1 || !this.userData.assets.sourceOfDeposit){
        this.userData.checkData.assetDetails= false;
      } else {
        this.userData.checkData.assetDetails= true;
      }
    }
  },
  watch: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h2{margin:18px}.validationError{color:red;margin-top:-20px;margin-bottom:-21px}.pushDown{margin-top:25px}
</style>
