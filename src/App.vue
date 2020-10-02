<template>
  <v-app >
    <v-main class='gray'>
      <NavBar/>
      <Loading  v-show="$store.state.isDataLoading"/>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import NavBar  from './components/navBar';
import Loading from "./components/loading"

export default {
  name: 'App',

  components: {
    NavBar,
    Loading,
  },
  beforeCreate(){
    this.$store.dispatch('checkUserSessionAction')
  },

};
</script>