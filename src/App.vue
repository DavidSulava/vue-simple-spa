<template>
  <v-app >
    <v-main class='gray'>
      <NavBar/>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from './components/navBar';

export default {
  name: 'App',

  components: {
    NavBar,
  },
  beforeCreate(){
    this.$store.dispatch('checkUserSessionAction')
  },

};
</script>