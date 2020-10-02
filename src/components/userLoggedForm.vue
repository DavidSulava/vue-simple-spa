<template>
  <v-card class="pa-5" :outlined="true">
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="Heading 4 mb-1">{{getUser.email}}</v-list-item-title>
      </v-list-item-content>
      <v-list-item-avatar tile size="50" color="grey">
        <v-icon>mdi-account-box</v-icon>
      </v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn class="green white--text" text @click="toRedactProfile">{{elText.btnUserSetting}}</v-btn>
      <v-spacer></v-spacer>
      <v-btn class="red white--text" text @click="logOut">{{elText.btnUserExit}}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name  : "UserLoggedForm",
  props : {
    toRedactProfile: { type: Function },
  },

  data() {
    return {
      elText: {
        btnUserSetting : "Настройки",
        btnUserExit    : "Выйти"    ,
      },
      link  : "/profileRedact",
      path  : "/users/logOut" ,
    };
  },
  methods: {
    logOut() {
      this.$store.dispatch("logOutAction", this.path  );
    },
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
};
</script>