<template>
  <v-container>
    <v-app-bar :hide-on-scroll="true" flat class="orange" app>
      <!-- Логотип -->
      <v-toolbar-title class="text-uppercase hidden-xs-only">
        <i>Express</i>
        <span class="font-weight-black">
          App
        </span>
      </v-toolbar-title>
      <v-list
        class="ml-md-10 py-1 orange text--darken-5 d-flex"
        :dark="true"
      >
        <v-list-item
          v-for="link in allowedLinks"
          :key="link.name"
          class="white--text ml-2"
          router :to="link.path"
          :exact="true"
        >
          <v-list-item-content>
            <v-list-item-title>
              {{ link.name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-spacer></v-spacer>
      <!-- Показать форму -->
      <v-btn
        v-if="!user"
        class="success"
        depressed
        @click="loginFormShow =! loginFormShow"
      >
        <span>{{ elText.btnFormShow }}</span>
        <v-icon>mdi-login</v-icon>
      </v-btn>

      <!-- Показать форму залогиненного Пользователя -->
      <v-btn
        v-else-if="user"
        class="success"
        fab
        small
        depressed
        @click="userFormShow =! userFormShow"
      >
        <v-icon>mdi-account-box</v-icon>
      </v-btn>
      <!-- Форма логина -->
      <v-dialog
          v-if="!user"
          v-model="loginFormShow"
          opacity="0.20"
          width="500px"
      >
        <LoginForm :toRegister="toRegister" :snackbar="snackbar"/>
      </v-dialog>
      <!-- Форма залогиненого Пользователя -->
      <v-dialog
        v-else-if="user"
        v-model="userFormShow"
        :hide-overlay="true"
        width="400px"
      >
        <UserLoggedForm :toRedactProfile="toRedactProfile" />
      </v-dialog>
    </v-app-bar>
  </v-container>
</template>

<script>
import {mapGetters, mapState} from 'vuex';
import LoginForm from './loginForm';
import UserLoggedForm from './userLoggedForm';

export default {
  name: 'NavBar',
  components: {
    LoginForm,
    UserLoggedForm
  },
  data() {
    return {
      elText: {
        btnFormShow: "Login",
        btnUserSetting: "Settings",
        btnUserExit: "Exit",
      },
      links: [
        {path: '/home', name: 'Home'},
        {path: '/bills', name: 'Invoices'},
        {path: '/calls', name: 'Calls'}
      ],
      loginFormShow: false,
      userFormShow: false,
      snackbar: {show: false, timeout: 3000, snackText: '', color: 'error'},
    };
  },
  computed: {
    ...mapGetters(['getMsgServer']),
    ...mapState(['user']),
    allowedLinks() {
      return this.links.filter((el, index) => {
        if (index === 0)
          return true
        else if (index > 0 && this.user)
          return true
      })
    },
  },
  watch: {
    getMsgServer(newState) {

      if (newState && newState.errorCred) {
        this.snackbar.color = 'error';
        this.snackbar.show = true;
        this.snackbar.snackText = newState.errorCred;
      }
    },

  },
  methods: {
    toRegister() {
      this.$router.push({path: '/register'});
      this.loginFormShow = false;
    },
    toRedactProfile() {
      this.$router.push({path: '/profileRedact'});
      this.userFormShow = false;
    }
  },
}
</script>