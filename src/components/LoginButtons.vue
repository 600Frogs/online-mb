<template>
  <span flex class="loginButtons">
    <span v-if="authenticated">
      <v-btn @click.stop="logout" flex color="error" :loading="loading" :disabled="loading">Logout</v-btn>
    </span>
    <span v-else-if="!authenticated">
      <v-layout row>
        <v-btn color="success" @click.stop="popUpLogin = true">Login</v-btn>
        <v-dialog v-model="popUpLogin" max-width="500px">
         <v-card>
           <v-card-title>
             Login
           </v-card-title>
           <v-card-text @keydown.enter="signIn">
             <v-text-field type="email" v-model="userData.email" placeholder="Email"></v-text-field><br>
             <v-text-field type="password" v-model="password" placeholder="Password"></v-text-field><br>
             <v-btn color="success" v-on:submit.prevent.stop="signIn" v-on:click="signIn" :loading="loading" :disabled="loading">Login</v-btn>
             <p>Don't have an account yet? <a @click="popUpLogin=false; popUpSignUp=true">Sign up here!</a></p>
           </v-card-text>
           <v-card-actions>
             <v-btn color="primary" flat @click.stop="popUpLogin=false">Close</v-btn>
           </v-card-actions>
         </v-card>
       </v-dialog>
       <v-btn color="error" @click.stop="popUpSignUp = true">Sign Up</v-btn>
       <v-dialog v-model="popUpSignUp" max-width="500px">
        <v-card>
          <v-card-title>
            Sign Up
          </v-card-title>
          <v-card-text @keydown.enter="signUp">
            <v-text-field type="email" v-model="userData.email" placeholder="Email"></v-text-field><br>
            <v-text-field type="password" v-model="password" placeholder="Password"></v-text-field><br>
            <v-btn color="error" v-on:submit.prevent.stop="signUp" v-on:click="signUp" :loading="loading" :disabled="loading">Sign Me Up Doc</v-btn>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" flat @click.stop="popUpSignUp=false">Close</v-btn>
          </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </span>

 </span>
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";

export default {
  name: "login",
  data: function() {
    return {
      password: "",
      popUpLogin: false,
      popUpSignUp: false,
      loading: false
    };
  },
  methods: {
    signIn: function() {
      var vm = this;
      this.loading = true;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.userData.email, this.password)
        .then(
          function(user) {
            vm.$store.commit("snack", {
              color: "success",
              message: "Success!"
            });
            vm.popUpLogin = false;
            vm.loading = false;
          },
          function(err) {
            vm.$store.commit("snack", {
              color: "error",
              message: "Oops! " + err.message
            });
            vm.loading = false;
          }
        );
    },
    signUp: function() {
      var vm = this;
      this.loading = true;
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.userData.email, this.password)
        .then(
          function(user) {
            vm.createUser(user);
            vm.$store.commit("snack", {
              color: "success",
              message: "Success! Account has been created."
            });
            vm.loading = false;
          },
          function(err) {
            vm.$store.commit("snack", {
              color: "error",
              message: "Oops! " + err.message
            });
            vm.loading = false;
          }
        );
    },
    createUser: function(user) {
      var vm = this;
      this.loading = true;
      var data = {};
      for (var element in vm.userData) {
        data[element] = vm.userData[element];
      }
      firebase
        .firestore()
        .collection("users")
        .doc(user.user.uid)
        .set(data);
    },
    logout: function() {
      var vm = this;
      this.loading = true;
      firebase
        .auth()
        .signOut()
        .then(() => {
          vm.$store.commit("snack", {
            color: "success",
            message: "You have successfully logged out."
          });
          vm.popUpLogin = false;
          this.loading = false;
          vm.$store.commit("resetUserData", "Im not important");
        });
    }
  },
  computed: {
    authenticated() {
      return this.$store.state.authenticated;
    },
    ...mapGetters({
      userData: "getUserData"
    })
  }
};
</script>

<style scoped>
</style>
