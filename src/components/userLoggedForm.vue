<template>
  <v-card
    class="pa-5"
    :outlined="true"
  >
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="Heading 4 mb-1">
          {{ getUser?.email }}
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-avatar tile size="50" color="grey">
        <v-icon>mdi-account-box</v-icon>
      </v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn
        class="green white--text"
        text
        @click="toRedactProfile"
      >
        {{ elText.btnUserSetting }}
      </v-btn>
      <v-spacer />
      <v-btn
        class="red white--text"
        text
        @click="logOut"
      >
        {{ elText.btnUserExit }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "UserLoggedForm",
  emits: ['on-close'],
  data() {
    return {
      elText: {
        btnUserSetting: "Settings",
        btnUserExit: "Exit",
      },
      link: "/profileRedact",
      path: "/users/logOut",
    };
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  methods: {
    toRedactProfile() {
      this.$router.push({path: '/profileRedact'});
      this.$emit('on-close');
    },
    logOut() {
      this.$store.dispatch("logOutAction", this.path);
      this.$emit('on-close');
    },
  },
};
</script>