import { getField, updateField } from 'vuex-map-fields'

const state = {
  userData: {
  },
  userDataOps: {
    yesNo:[
      'Yes',
      'No'
    ],
    numberOfApplicants:[
      'One',
      'Two'
    ],
    purchasedBefore:[
      'Yes - I currently own a house in Australia',
      'Yes - I have owned a house in Australia before',
      'Yes - Outside of Australia, but not in Australia',
      'No - I have never owned a house before'
    ],
    citizenStatus:[
      'Australian Citizen',
      'Permanent Resident',
      'Temporary Resident',
      'Other'
    ],
    relationshipStatus:[
      'Single',
      'Defacto',
      'Engaged',
      'Married',
      'Recently Divorced'
    ],
    typeOfEmployment: [
        'Full Time Permanent',
        'Part Time Permanent',
        'Casual',
        'Self-Employed'
    ],
    baseWageType: [
      'Gross: before tax',
      'Tax free income'
    ],
    baseWagePeriod: [
      'Weekly',
      'Fortnightly',
      'Monthly',
      'Annually'
    ],
    onProbation: [
      'Yes',
      'No'
    ],
    residentialStatus: [
      'Renting through a Real Estate Agent',
      'Renting - Privately',
      'Boarding i.e. with parents or family',
      'You own your house unencumbered',
      'You own your house and have a mortgage',
      'Other'
    ],
    partnerOfApplicantOne: [
      'Yes',
      'No'
    ],
    typeOfIncome: [
      'Overtime',
      'Allowances',
      'Bonus/Commission',
      'Rental Income',
      'Expected Rental Return on Purchase',
      'Other investment income',
      'FTB A/B',
      'Other Centrelink Income',
      'Child Support',
      'Second job PAYG',
      'Second income under ABN',
      'Other'

    ],
    sourceOfDeposit: [
      'Savings - held for more than 3 months',
      'Savings - held for less than 3 months',
      'Equity in current property',
      'Equity in parents property',
      'Gift from parents',
      'Loan',
      'Other'
    ],
    typeOfAsset: [
      'Contents',
      'Motor Vehicle',
      'Life Insurance',
      'Real Estate',
      'Redraw',
      'Savings',
      'Other'
    ],
    typeOfLiability: [
      'Credit Card',
      'Personal Loan',
      'Car Loan',
      'Home Loan',
      'Tax Debt',
      'HECS Debt',
      'Centrelink Debt',
      'Line of Credit',
      'Child Support',
      'Other'
    ],
    states: [
      'Australian Capital Territory',
      'New South Wales',
      'Queensland',
      'South Australia',
      'Tasmania',
      'Victoria',
      'Western Australia'
    ],
    propertyType: [
      'Owner Occupied',
      'Investment'
    ],
    securityType: [
      'Established House',
      'New House',
      'Vacant Land',
      'Construction'
    ],
    nameOnLoan: [
      'Both',
      'Applicant One',
      'Applicant Two'
    ]
  }

}

const mutations = {
  updateField,
  setUserData (state, user) {
    state.userData = user;
  },
  addIncome (state, payload) {
    state.userData.income.push({"amount":0, "incomeType":"test", "incomeInputType":"Net: after tax", "period":"Weekly"});
  },
  removeIncome (state, payload) {
    state.userData.income.splice(payload,1);
  },
  addIncome2 (state, payload) {
    state.userData.applicantTwo.income.push({"amount":0, "incomeType":"test", "incomeInputType":"Net: after tax", "period":"Weekly"});
  },
  removeIncome2 (state, payload) {
    state.userData.applicantTwo.income.splice(payload,1);
  },
  addAsset (state, payload) {
    state.userData.assets.additionalAssets.push({"assetType":"", "value":"0", "notes":"", "address":""});
  },
  removeAsset (state, payload) {
    state.userData.assets.additionalAssets.splice(payload,1);
  },
  addLiability (state, payload) {
    state.userData.liabilities.additionalLiabilities.push({"type":"", "lender":"", "notes":"", "moneyOwing":"0", "limit":"0", "monthlyPayments":"100", "interestRate":"4", "termRemaining":"30", "address":"","taxDeductible":"No","iOTermRemaining":"0","nameOnLoan":"Both"});
  },
  removeLiability (state, payload) {
    state.userData.liabilities.additionalLiabilities.splice(payload,1);
  },
  resetUserData (state, payload) {
    state.userData = {
      id: 'Applicant One',
      firstName: '',
      middleName: '',
      surname: '',
      email: '',
      phoneNumber: '',
      dateOfBirth: '',
      citizenStatus: '',
      purchasedBefore: 'No',
      relationshipStatus: 'Single',
      numberOfApplicants: "One",
      numberOfDependents: 0,
      income: [],
      proposedLoan: {
        purchasePrice: 400000,
        deposit: 20000,
        state: "Queensland",
        stampDuty: 0,
        propertyType: "Owner Occupied",
        firstHomeBuyer: "No",
        securityType: "Established House",
        term: 30,
        postcode: ""
      },
      residential: {
        currentAddress: '',
        timeAtCurrent: 36,
        currentArrangement: '',
        weeklyRentPaid: 0,
        rentingPostSettlement: "No",
        previousAddress: '',
        timeAtPrevious: 36,
        previousAddress2: '',
        timeAtPrevious2: 36
      },
      employment: {
        currentPosition: '',
        currentEmployer: '',
        address: '',
        typeOfEmployment: '',
        dateStarted: '',
        onProbation: 'No',
        baseWage: 0,
        baseWageType: 'Gross: before tax',
        baseWagePeriod: 'Weekly',
        previousEmployment: {
          position: '',
          employer: '',
          address: '',
          typeOfEmployment: '',
          monthsInEmployment: 36,
        },
        previousEmployment2: {
          position: '',
          employer: '',
          address: '',
          typeOfEmployment: '',
          monthsInEmployment: 36,
        }
      },
      checkData: {
        basicDetails: false,
        basicDetailsApp1: false,
        basicDetailsApp2: false,
        residentialDetails: false,
        residentialDetailsApp1: false,
        residentialDetailsApp2: false,
        employmentDetails: false,
        employmentDetailsApp1: false,
        employmentDetailsApp2: false,
        incomeDetails: false,
        incomeDetailsApp1: false,
        incomeDetailsApp2: false,
        assetDetails: false,
        liabilitiesDetails:false
      },
      applicantTwo: {
        id: 'Applicant Two',
        firstName: '',
        middleName: '',
        surname: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: '',
        citizenStatus: '',
        purchasedBefore: 'No',
        relationshipStatus: 'Defacto',
        partnerOfApplicantOne: true,
        income: [],
        residential: {
          currentAddress: '',
          timeAtCurrent: 36,
          currentArrangement: '',
          weeklyRentPaid: 0,
          previousAddress: '',
          timeAtPrevious: 36,
          previousAddress2: '',
          timeAtPrevious2: 36
        },
        employment: {
          notWorking: false,
          currentPosition: '',
          currentEmployer: '',
          address: '',
          typeOfEmployment: '',
          dateStarted: '',
          onProbation: 'No',
          baseWage: 0,
          baseWageType: 'Gross: before tax',
          baseWagePeriod: 'Weekly',
          previousEmployment:{
            position: '',
            employer: '',
            address: '',
            typeOfEmployment: '',
            monthsInEmployment: 36,
          },
          previousEmployment2:{
            position: '',
            employer: '',
            address: '',
            typeOfEmployment: '',
            monthsInEmployment: 36,
          }
        }
      },
      assets: {
        depositAvailable: 0,
        genuineSavings: false,
        sourceOfDeposit: '',
        additionalAssets: [],
        rentedOverTwelveMonths: false
      },
      liabilities: {
        livingExpenses: {
          basicLivingExpenses: 0,
          accurateLivingExpenses: {
            ratesAndUtilities: 0,
            groceries: 0,
            clothingAndPersonal: 0,
            entertainment: 0,
            medical: 0,
            educationAndChildcare: 0,
            communication: 0,
            transport: 0,
            insurance: 0,
            other: 0,
            otherDetails: ''
            },
          },
        additionalLiabilities: []

      }};

  },

}

const actions = {

}

const getters = {
  getField,
  getUserData (state) {
    return state.userData;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
