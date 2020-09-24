<template>
 <v-container >
    <v-app-bar :hide-on-scroll='true' flat class='orange' app>
        <!-- Логотип -->
        <v-toolbar-title class="text-uppercase">
            <i>Express</i>
            <span class='font-weight-black'>
              App
            </span>
        </v-toolbar-title>

        <v-list class='ml-10 orange text--darken-5 d-flex' :dark='true' >
          <v-list-item v-for='link in allowedLinks' :key="link.name" class='white--text ml-2' router :to="link.path" :exact='true' >
            <v-list-item-content>
              <v-list-item-title>
                {{link.name}}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-spacer></v-spacer>

        <!-- Показать форму -->
        <v-btn class='success'  v-if="!user" depressed  @click="loginFormShow =! loginFormShow">
          <span>{{elText.btnFormShow}}</span>
          <v-icon>mdi-login</v-icon>
        </v-btn>

        <!-- Показать форму залогиненного Пользователя -->
        <v-btn class='success'
          v-else-if="user"
          fab
          small
          depressed
          @click="userFormShow =! userFormShow">

            <v-icon>mdi-account-box</v-icon>
        </v-btn>

        <!-- Форма логина -->
        <v-dialog  opacity="0.20" width="500px" v-if="!user" v-model="loginFormShow">
          <LoginForm :toRegister="toRegister" :snackbar="snackbar"/>
        </v-dialog>

        <!-- Форма залогиненого Пользователя -->
        <v-dialog  :hide-overlay='true'  width="400px" v-else-if="user" v-model="userFormShow">
          <UserLoggedForm :toRedactProfile="toRedactProfile" />
        </v-dialog>


    </v-app-bar >
  </v-container>
</template>

<script>
  import {  mapGetters, mapState } from 'vuex';
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
          btnFormShow: "Войти",
          btnUserSetting: "Настройки",
          btnUserExit: "Выйти",
        },
        links:[
          { path: '/home', name: 'Домой' },
          { path: '/bills', name: 'Счета' },
          { path: '/calls', name: 'Звонки' }
        ],
        loginFormShow: false,
        userFormShow: false,
        snackbar: {show: false, timeout: 3000, snackText : '', color:'error'},
      };
    },
    created(){
      this.checkSession
    },
    methods: {

      toRegister(){
        this.$router.push({ path: '/register' });
        this.loginFormShow = false;
      },
      toRedactProfile(){
        this.$router.push({ path: '/profileRedact' });
        this.userFormShow = false;
      }
    },
    computed: {
      allowedLinks(){
        return this.links.filter( (el, index) =>{
          if(index == 0)
            return true
          else if(index>0 && this.user)
            return true
        } )
      },
      checkSession(){
        return this.$store.dispatch('checkUserSessionAction')
      },
      ...mapGetters(['getMsgServer']),
      ...mapState(['user'])
    },
    watch:{
      getMsgServer(newState){

        if(newState && newState.errorCred){
          this.snackbar.color = 'error';
          this.snackbar.show = true;
          this.snackbar.snackText = newState.errorCred;
        }
      },

    },
  }
</script>