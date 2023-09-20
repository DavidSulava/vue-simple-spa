<template>
  <v-container class="col-8">
    <!-- SnackBar -->
    <v-snackbar
      v-model="snackbar.show"
      :absolute="true"
      :timeout="snackbar.timeout"
      top="top"
      :color="snackbar.color"
    >
      {{ snackbar.snackText }}
    </v-snackbar>
  </v-container>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: "RegisterUser",
  data() {
    return {
      snackbar: {show: false, timeout: 3000, snackText: '', color: 'success'},
      path: "/users/email/confirmation?",
    };
  },
  computed: {
    ...mapState(['msgServer']),
  },
  watch: {
    msgServer(newState) {
      let error = newState.errorCred || newState.timeErr;
      var redirect = (time) => {
        setTimeout(() => {
          this.$router.push({path: "/home"});
        }, time);
      }

      if (error) {
        this.snackbar.snackText = error;
        this.snackbar.color = 'error';
        this.snackbar.timeout = 90000;
        this.snackbar.show = true;

        redirect(5000);
        return
      } else if (newState.emailConfirmed) {
        this.snackbar.snackText = newState.emailConfirmed;
        this.snackbar.color = 'success';
        this.snackbar.show = true;

        redirect(5000);
        return
      }

      redirect(7000);
    }
  },
  created() {
    this.verifyEmail()
  },
  methods: {
    verifyEmail() {
      let email = this.$route.params.email;
      let token = this.$route.params.token;

      if (!email || !token) {
        this.$router.push({path: "/home"});
        return;
      }
      this.$store.dispatch("emailVerifyAction", {path: this.path + `email=${email}&token=${token}`});
    }
  },

};
</script>