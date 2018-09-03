<template>
  <v-toolbar fixed app class='z-light-blue'>
    <v-toolbar-side-icon @click.stop="toggleSideBar"></v-toolbar-side-icon>
    <v-toolbar-title>Online Mortgage Broker</v-toolbar-title>
    <v-spacer></v-spacer>
    <loginButtons></loginButtons>
  </v-toolbar>
</template>

<script>
import { mapGetters } from "vuex";
import loginButtons from "@/components/LoginButtons";

export default {
  name: "topBar",
  data: function() {
    return {};
  },
  components: {
    loginButtons
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("toggleSideBar");
    }
  },
  computed: {
    ...mapGetters({
      drawer: "getDrawerState"
    })
  }
};
</script>

<style scoped>
</style>
