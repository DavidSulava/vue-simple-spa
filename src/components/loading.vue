<template>
  <v-container class='align-center progressBar' height="25" >

    <div>
        <v-progress-linear
            indeterminate
            color="green">
        </v-progress-linear>
    </div>

  </v-container>
</template>


<script>
  export default {
    name: "Loading",
  }
</script>

<style>
  .progressBar {
    position  : absolute;
    top       : 15px;
    left      : 50%;
    transform : translate(-50%, 0);
  }
</style>