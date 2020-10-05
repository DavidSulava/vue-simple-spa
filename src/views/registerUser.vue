<template>
  <v-container class="col-xs-11 col-md-8">
    <v-form
      ref="regForm"
      class="grey lighten-2 pa-5 rounded elevation-2"
      @submit.prevent="register">
      <!-- Почта -->
      <v-text-field
        name="email"
        v-model="formData.email"
        :label="elText.labelEmail"
        required
        :rules="emailRules"
      ></v-text-field>

      <!-- Имя -->
      <v-text-field name="firstName" v-model="formData.name" :label="elText.labelName"></v-text-field>

      <!-- Фамилия -->
      <v-text-field name="lastName" v-model="formData.lastName" :label="elText.labelLastName"></v-text-field>

      <!-- Пароль -->
      <v-text-field
        name="password"
        class="mt-15"
        v-model="formData.password"
        :label="elText.labelPassword"
        required
        type="password"
        :rules="passRules"
      ></v-text-field>

      <!-- Подтвердить пароль -->
      <v-text-field
        name="password_confirmation"
        v-model="formData.passCompare"
        :label="elText.labelPassConfirm"
        required
        type="password"
        :rules="passRules"
      ></v-text-field>

      <!-- Кнопка регистрации -->
      <v-container class="d-flex justify-center  justify-sm-end">
        <v-btn class="success mt-3" type="submit">{{elText.btnRegister}}</v-btn>
      </v-container>
    </v-form>

    <!-- SnackBar -->
    <v-snackbar
        v-model="snackbar.show"
        :absolute='true'
        :timeout="snackbar.timeout"
        top='top'
        :color='snackbar.color'>

            {{ snackbar.snackText }}
    </v-snackbar>
  </v-container>
</template>

<script>
import {  mapGetters, mapState } from 'vuex';

export default {
  name: "RegisterUser",

  data() {
    return {
      msgVal      : ""   ,
      passMax     : 50   ,
      minPassLen  : 8    ,
      allowSpaces : false,
      elText      : {
        btnRegister      : "Зарегестрироваться"  ,
        labelName        : "имя"                 ,
        labelLastName    : "фамилия"             ,
        labelEmail       : "* эл.почта"          ,
        labelPassword    : "* пароль"            ,
        labelPassConfirm : "* подтвердить пароль",
      },
      formData    : {
        name        : null,
        lastName    : null,
        email       : null,
        password    : null,
        passCompare : null,
      },
      info        : {
        success: "Пользователь успешно зарегистрирован 😃",
        inputError: "поле не может быть пустым",
        emailNotValid: "не валидный почтовый адрес!",
        passworError: [
          "пароль не должен содержать пробелов",
          "пароль не может быть больше",
          "пароль должен содержать минимум",
          "пароли не совпадают",
        ],
      },
      snackbar    : {show: false, timeout: 3000, snackText : '', color:'success'},
      path        : "/users/register",
    };
  },
  created(){
    this.user
  },
  methods: {
    register() {
      if (!this.$refs.regForm.validate()) return;

      let formD = new FormData(this.$refs.regForm.$el);

      this.$store.dispatch("loginAction", { path: this.path, form: formD });
    }
  },
  computed: {
    ...mapGetters(['getUser','getMsgServer']),
    ...mapState(['user']),

    //--validation rules
    passRules() {
      const rules = [];

      if (this.passMax) {
        const passMax = (v) =>
          (v || "").length <= this.passMax ||
          `${this.info.passworError[1]} ${this.minPassLen} символов`;

        rules.push(passMax);
      }

      if (!this.allowSpaces) {
        const allowSpaces = (v) =>
          (v || "").indexOf(" ") < 0 || this.info.passworError[0];

        rules.push(allowSpaces);
      }

      if (this.minPassLen) {
        const minPassLen = (v) =>
          (v || "").length >= this.minPassLen ||
          `${this.info.passworError[2]} ${this.minPassLen} символов`;

        rules.push(minPassLen);
      }

      if (this.password === this.rePassword) {
        const passMatch =
          this.formData.password === this.formData.passCompare ||
          this.info.passworError[3];
        rules.push(passMatch);
      }

      return rules;
    },
    emailRules() {
      const eRules = [
        (v) => !!v || this.info.inputError,
        (v) => /.+@.+\..+/.test(v) || this.info.emailNotValid,
      ];
      return eRules;
    },

  },
  watch:{
    getMsgServer(newState){

        if(newState &&  newState.regSuccess){
          this.snackbar.color = 'success';
          this.snackbar.show = true;
          this.snackbar.snackText = newState.regSuccess;
        }else if(newState &&  newState.errorCred){
          this.snackbar.color = 'error';
          this.snackbar.show = true;
          this.snackbar.snackText = newState.errorCred;
        }
    },
    user(newState){
      if(newState && 'email' in newState)
        this.$router.push({ path: '/home' });
    }

  }
};
</script>