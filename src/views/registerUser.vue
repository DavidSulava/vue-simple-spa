<template>
  <v-container class="col-xs-11 col-md-8">
    <v-form
      ref="regForm"
      class="grey lighten-2 pa-5 rounded elevation-2"
      @submit.prevent="register">
      <!-- Почта -->
      <v-text-field
        v-model="formData.email"
        name="email"
        :label="elText.labelEmail"
        required
        :rules="emailRules"
      />
      <!-- Имя -->
      <v-text-field
        v-model="formData.name"
        name="firstName"
        :label="elText.labelName"
      />
      <!-- Фамилия -->
      <v-text-field
        v-model="formData.lastName"
        name="lastName"
        :label="elText.labelLastName"
      />
      <!-- Пароль -->
      <v-text-field
        v-model="formData.password"
        name="password"
        class="mt-15"
        :label="elText.labelPassword"
        required
        type="password"
        :rules="passRules"
      />
      <!-- Подтвердить пароль -->
      <v-text-field
        v-model="formData.passCompare"
        name="password_confirmation"
        :label="elText.labelPassConfirm"
        required
        type="password"
        :rules="passRules"
      />
      <!-- Кнопка регистрации -->
      <v-container class="d-flex justify-center  justify-sm-end">
        <v-btn class="success mt-3" type="submit">
          {{ elText.btnRegister }}
        </v-btn>
      </v-container>
    </v-form>
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
import {  mapGetters, mapState } from 'vuex';

export default {
  name: "RegisterUser",
  data() {
    return {
      msgVal: "",
      passMax: 50,
      minPassLen: 8,
      allowSpaces : false,
      elText: {
        btnRegister: "register",
        labelName: "name",
        labelLastName: "surname",
        labelEmail: "* email",
        labelPassword: "* password",
        labelPassConfirm: "* confirm password",
      },
      formData: {
        name: null,
        lastName: null,
        email: null,
        password: null,
        passCompare: null,
      },
      info: {
        success: "User successfully registered 😃",
        inputError: "field cannot be empty",
        emailNotValid: "invalid email address!",
        passworError: [
          "password must not contain spaces",
          "password cannot be greater",
          "password must contain at least",
          "password mismatch",
        ],
      },
      snackbar: {show: false, timeout: 3000, snackText : '', color:'success'},
      path: "/users/register",
    };
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
        if (newState &&  newState.regSuccess){
          this.snackbar.color = 'success';
          this.snackbar.show = true;
          this.snackbar.snackText = newState.regSuccess;
        } else if (newState &&  newState.errorCred){
          this.snackbar.color = 'error';
          this.snackbar.show = true;
          this.snackbar.snackText = newState.errorCred;
        }
    },
    user(newState){
      if(newState && 'email' in newState)
        this.$router.push({ path: '/home' });
    }
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
};
</script>