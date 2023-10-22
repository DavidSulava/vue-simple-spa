<template>
  <v-form
    ref="loginForm"
    class="white pa-4"
    @submit.prevent="login"
  >
    <!-- Email -->
    <v-text-field
      v-model="formData.email"
      name="email"
      label="email"
      required
      :rules="emailRules"
    />
    <!-- Password -->
    <v-text-field
      v-model="formData.password"
      name="password"
      label="password"
      required
      type="password"
      :rules="passRules"
    />
    <!-- Button Login && Button Sign-up -->
    <v-container class="d-flex justify-space-between">
      <v-btn
        class="success mt-3  mr-1"
        small
        :loading="isLoading"
        type="submit"
      >
        {{ elText.btnFormShow }}
      </v-btn>
      <!-- <v-spacer></v-spacer> -->
      <v-btn
        class="success mt-3 ml-1"
        small
        :disabled="isLoading"
        @click="toRegister"
      >
        {{ elText.btnRegister }}
      </v-btn>
    </v-container>
    <v-snackbar
      v-model="snackbar.show"
      :absolute="true"
      :timeout="snackbar.timeout"
      top="top"
      :color="snackbar.color"
    >
      {{ snackbar.snackText }}
    </v-snackbar>
  </v-form>
</template>

<script>
import {mapGetters} from 'vuex';


export default {
  name: 'LoginForm',
  props: {
    snackbar: {
      type: Object,
      default: () => {},
    },
  },
  emits: ['on-close'],
  data() {
    return {
      isFormLoading: false,
      msgVal: "",
      passMax: 50,
      minPassLen: 8,
      allowSpaces: false,
      isLoading: false,
      elText: {
        btnFormShow: "Login",
        btnRegister: "Sign-up",
      },
      formData: {email: null, password: null},
      info: {
        success: "User successfully registered 😃",
        inputError: "field cannot be empty",
        emailNotValid: "invalid email!",
        passworError: [
          'password must not contain spaces',
          `password cannot be greater`,
          `password must contain at least`,
        ],
      },
      path: '/users/login',
    };
  },
  computed: {
    ...mapGetters(['getMsgServer']),
    passRules() {
      const rules = []
      if (this.passMax) {
        const passMax = v => (v || '').length <= this.passMax || `${this.info.passworError[1]} ${this.minPassLen} символов`
        rules.push(passMax)
      }
      if (!this.allowSpaces) {
        const allowSpaces = v => (v || '').indexOf(' ') < 0 || this.info.passworError[0]
        rules.push(allowSpaces)
      }
      if (this.minPassLen) {
        const minPassLen = (v) => (v || "").length >= this.minPassLen || `${this.info.passworError[2]} ${this.minPassLen} символов`;

        rules.push(minPassLen)
      }
      return rules
    },
    emailRules() {
      return [
        v => !!v || this.info.inputError,
        v => /.+@.+\..+/.test(v) || this.info.emailNotValid,
      ]
    },
  },
  watch: {
    getMsgServer(newState) {
      if (newState && newState.msgServer && newState.msgServer.errorCred) {
        this.snackbar.show = true;
        this.snackbar.snackText = newState.msg.errorCred;
      }
    }
  },
  methods: {
    toRegister() {
      this.$router.push({path: '/register'});
      this.$emit('on-close');
    },
    async login() {
      this.snackbar.snackText = '';
      if (!this.$refs.loginForm.validate()) {
        return
      }

      let formD = new FormData(this.$refs.loginForm.$el);
      try {
        this.isLoading = true;
        await this.$store.dispatch('loginAction', {path: this.path, form: formD});
        this.$emit('on-close');
      } finally {
        this.isLoading = false;
      }
    },
  },
}
</script>