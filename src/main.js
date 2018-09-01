// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import firebase from 'firebase'
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete';

import { store } from './store/'

Vue.config.productionTip = false
Vue.use(Vuetify, {
  theme: {
    primary: '#3991EE',
    secondary: '#2E94AB',
    accent: '#E6E6E6'
  }
})
Vue.use(VuetifyGoogleAutocomplete, {
  apiKey: 'AIzaSyCUCRQH_mSHerKcpGSMDWjJ6juRZI_RIO8'
});

let app;
var config = {
  apiKey: "AIzaSyAm_5r7LTubgdLPC86B1ugzzOy_xgdvjmM",
  authDomain: "online-mortgage-broker.firebaseapp.com",
  databaseURL: "https://online-mortgage-broker.firebaseio.com",
  projectId: "online-mortgage-broker",
  storageBucket: "online-mortgage-broker.appspot.com",
  messagingSenderId: "854531985357"
};

firebase.initializeApp(config);
const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);


firebase.auth().onAuthStateChanged(function(user){
  if (!app){
    new Vue({
      el: '#app',
      router,
      store,
      components: { App },
      template: '<App/>'
    })
  }
});
