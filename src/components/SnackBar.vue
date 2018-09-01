<template>
  <v-snackbar :value="show" :timeout="timeoutVal" :color="color">
   {{ message }}
   <v-btn flat color="white" @click.native="closeSnack">Close</v-btn>
  </v-snackbar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {

    }
  },
  methods: {
    closeSnack: function() {
      this.$store.commit('snack', '');
      this.$store.dispatch('hideSnack');
    }
  },
  computed: {
    ...mapGetters({
      message: 'getSnackMessage',
      show: 'getSnackShow',
      timeoutVal: 'getSnackTimeout',
      color: 'getSnackColor'
    })
  }
}
</script>
