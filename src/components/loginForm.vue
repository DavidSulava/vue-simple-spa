<template>
  <v-form ref='loginForm' class="white pa-4"  @submit.prevent="login">

    <!-- Эл.почта -->
    <v-text-field
        name='email'
        v-model="formData.email"
        label="email"
        required
        :rules="emailRules"
    ></v-text-field>

    <!-- Пароль -->
    <v-text-field
        name='password'
        v-model="formData.password"
        label="password"
        required
        type="password"
        :rules="passRules"
    ></v-text-field>

    <!-- Кнопка Войти && Кнопка Зарегестрироваться -->
    <v-container class="d-flex">
        <v-btn class="success mt-3" type='submit'>{{elText.btnFormShow}}</v-btn>
        <v-spacer></v-spacer>
        <v-btn class="success mt-3" @click="toRegister()">
            {{elText.btnRegister}}
        </v-btn>
    </v-container>

    <v-snackbar
        v-model="snackbar.show"
        :absolute='true'
        :timeout="snackbar.timeout"
        top='top'
        :color='snackbar.color'>

        {{ snackbar.snackText }}
    </v-snackbar>

  </v-form>
</template>

<script>
    import {  mapGetters } from 'vuex';


    export default {
        name: 'LoginForm',

        props: {
            toRegister: { type: Function },
            snackbar: Object
        },

        data() {
            return {
                msgVal: "",
                passMax:50,
                minPassLen: 8,
                allowSpaces: false,
                elText: {
                    btnFormShow: "Войти",
                    btnRegister: "Зарегестрироваться",
                },
                formData:{email:null, password:null},
                info: {
                    success: "Пользователь успешно зарегистрирован 😃",
                    inputError: "поле не может быть пустым",
                    emailNotValid: "не валидный почтовый адрес!",
                    passworError:[
                        'пароль не должен содержать пробелов',
                        `пароль не может быть больше`,
                        `пароль должен содержать минимум`,
                    ],
                },
                path:'/users/login',
            };
        },
        methods:{
            login(){
                this.snackbar.snackText = '';
                if(!this.$refs.loginForm.validate())
                    return

                let formD = new FormData( this.$refs.loginForm.$el );

                this.$store.dispatch('loginAction', { path:this.path, form: formD });
            },
        },
        watch:{
            getMsgServer(newState){

                if( newState && newState.msgServer && newState.msgServer.errorCred ){
                    this.snackbar.show = true;
                    this.snackbar.snackText = newState.msg.errorCred;
                }
            }
        },
        computed: {
            passRules () {
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
                    const minPassLen =  (v) => (v || "").length >= this.minPassLen ||`${this.info.passworError[2]} ${this.minPassLen} символов`;

                    rules.push(minPassLen)
                }

                return rules
            },
            emailRules(){
                const eRules = [
                    v => !!v || this.info.inputError,
                    v => /.+@.+\..+/.test(v) || this.info.emailNotValid,
                ]
                return eRules

            },
            ...mapGetters(['getMsgServer']),
        },

    }
</script>