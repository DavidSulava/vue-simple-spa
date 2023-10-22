<template>
  <v-container>
    <v-app-bar
      :hide-on-scroll="true"
      flat
      class="orange"
      app
    >
      <!-- Logo -->
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
      <v-spacer />
      <!-- Login button -->
      <v-btn
        v-if="!user"
        class="success"
        depressed
        @click="toggleLoginForm"
      >
        <span>{{ elText.btnFormShow }}</span>
        <v-icon>mdi-login</v-icon>
      </v-btn>
      <!-- Logged user icon -->
      <v-btn
        v-else-if="user"
        class="success"
        fab
        small
        depressed
        @click="toggleUserForm"
      >
        <v-icon>mdi-account-box</v-icon>
      </v-btn>
      <!-- Login form -->
      <v-dialog
        v-show="!user"
        v-model="isLoginFormShow"
        opacity="0.20"
        width="500px"
      >
        <LoginForm
          :snackbar="snackbar"
          @on-close="toggleLoginForm"
        />
      </v-dialog>
      <!-- Uer logged form -->
      <v-dialog
        v-show="user"
        v-model="isUserFormShow"
        :hide-overlay="true"
        width="400px"
      >
        <UserLoggedForm @on-close="toggleUserForm" />
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
        {path: '/', name: 'Home'},
        {path: '/bills', name: 'Invoices'},
        {path: '/calls', name: 'Calls'}
      ],
      isLoginFormShow: false,
      isUserFormShow: false,
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
    toggleLoginForm() {
      this.isLoginFormShow = !this.isLoginFormShow;
    },
    toggleUserForm() {
      this.isUserFormShow = !this.isUserFormShow;
    },
  },
}
</script>