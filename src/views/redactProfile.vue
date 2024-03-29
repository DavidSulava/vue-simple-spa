<template>
  <v-container class="col-xs-11 col-md-8">
    <v-form
      ref="userCredentials"
      class="grey lighten-2 pa-5 rounded elevation-2"
      @submit.prevent="changeUserCredentials"
    >
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
        v-model="formData.firstName"
        name="firstName"
        :label="elText.labelName"
        :rules="userRules"
      />
      <!-- Фамилия -->
      <v-text-field
        v-model="formData.lastName"
        name="lastName"
        :label="elText.labelLastName"
        :rules="userRules"
      />
      <!-- Кнопка изменить данные -->
      <v-container class="d-flex justify-center  justify-sm-end">
        <v-btn class="success mt-3" type="submit">
          {{ elText.btnChange }}
        </v-btn>
      </v-container>
    </v-form>
    <v-form
      ref="passChangeForm"
      class="grey lighten-2 pa-5 mt-5 rounded elevation-2"
      @submit.prevent="changePassword"
    >
      <!-- Старый пароль -->
      <v-text-field
        v-model="formData.oldPassword"
        name="password"
        class="mt-15"
        :label="elText.labelOldPassword"
        required
        type="password"
        :rules="passRules"
      />
      <!-- Новый Пароль -->
      <v-text-field
        v-model="formData.newldPassword"
        name="new_assword"
        :label="elText.labelNewldPassword"
        required
        type="password"
        :rules="passRules"
      />
      <!-- Кнопка изменить данные -->
      <v-container class="d-flex justify-center  justify-sm-end">
        <v-btn class="success mt-3" type="submit">
          {{ elText.btnChange }}
        </v-btn>
      </v-container>
    </v-form>
    <v-form
      v-if="user && !user.isVerified"
      class="grey lighten-2 pa-5 mt-5 rounded elevation-2 "
      @submit.prevent="verifyEmail"
    >
      <!-- Кнопка изменить данные -->
      <v-container class="d-flex justify-center">
        <v-btn class="success mt-3" type="submit">
          {{ elText.btnVerify }}
        </v-btn>
      </v-container>
    </v-form>
    <!-- SnackBar -->
    <v-snackbar
      v-model="snackbar.show"
      class="snackBar"
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
  import {mapState} from "vuex";

  export default {
    name: "RedactProfile",
    data() {
      return {
        passMax: 50,
        minPassLen: 8,
        allowSpaces: false,
        notChangeableEmail: 'admin@gmail.com',
        elText: {
          btnChange: "Change",
          btnVerify: "Confirm email",
          labelName: "name",
          labelLastName: "surname",
          labelEmail: "* email",
          labelOldPassword: "* old password",
          labelNewldPassword: "* new password",
        },
        formData: {
          firstName: '',
          lastName: '',
          email: '',
          oldPassword: '',
          newldPassword: '',
        },
        info: {
          demoDataError: 'demo account data can`t be changed',
          inputError: "field cannot be empty",
          emailNotValid: "invalid email!",
          inputMaxChars: "field cannot be greater",
          inputErrorSpases: "field cannot contain spaces",
          passworError: [
            "password must not contain spaces",
            "password cannot be greater",
            "password must contain at least",
            "password mismatch",
          ],
        },
        snackbar: {show: false, timeout: 3000, snackText: '', color: 'success'},
        path: ["/users/updateUser", "/users/newPassword", "/users/email/sendVerification?"],
      };
    },
    computed: {
      ...mapState(["user", "msgServer"]),
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
        rules.push(() => this.formData.email !== this.notChangeableEmail || this.info.demoDataError);
        return rules;
      },
      emailRules() {
        const eRules = [
          (v) => !!v || this.info.inputError,
          (v) => /.+@.+\..+/.test(v) || this.info.emailNotValid,
          (v) => v !== this.notChangeableEmail || this.info.demoDataError,
        ];
        return eRules;
      },
      userRules() {
        const eRules = [
          (v) => (v || "").length <= this.passMax || `${this.info.inputMaxChars} ${this.passMax} символов`,
          (v) => (v || "").indexOf(" ") < 0 || this.info.inputErrorSpases
        ];
        return eRules;
      },
    },
    watch: {
      msgServer(newState) {
        let msgServer = newState.userUpdated || newState.passUpdated || newState.verLinkSend
        let serverMsgFail = (newState && newState.erPassword) ? newState.erPassword : null

        if (newState && msgServer) {
          this.snackbar.color = 'success';
          this.snackbar.show = true;
          this.snackbar.snackText = msgServer;
        } else if (newState && serverMsgFail) {
          this.snackbar.color = 'error';
          this.snackbar.show = true;
          this.snackbar.snackText = serverMsgFail;
        } else if (newState && newState.emailErr) {
          this.snackbar.color = 'error';
          this.snackbar.show = true;
          this.snackbar.snackText = newState.emailErr;
        }
      },
      user(newState) {
        if (!newState) this.$router.push({path: "/"});
        this.formData = {...this.formData, ...newState}
      },
    },
    created() {
      this.setFields();
    },
    methods: {
      changeUserCredentials() {
        if (!this.$refs.userCredentials.validate()) return;
        let formD = new FormData(this.$refs.userCredentials.$el);
        this.$store.dispatch("loginAction", {path: this.path[0], form: formD});
      },
      changePassword() {
        if (!this.$refs.passChangeForm.validate()) return;
        let formD = new FormData(this.$refs.passChangeForm.$el);
        this.$store.dispatch("loginAction", {path: this.path[1], form: formD});
      },
      verifyEmail() {
        this.$store.dispatch("emailVerifyAction", {path: this.path[2] + `email=${this.user.email}`});
      },
      setFields() {
        this.formData = {...this.formData, ...this.user}
      }
    },
  };
</script>
