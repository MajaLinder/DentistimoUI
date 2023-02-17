<template>
  <div id="app">
    <div id="header" v-on:click="toHome">
      <h>DENTISTIMO</h>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    toHome() {
      this.$router.push("/");
    },
  },
}
</script>

<style>

#header{
  font-size-adjust: initial;
  font-size: 50pt;
  text-align: center;
  cursor: pointer;

}

#app{
  font-family: 'Nunito', sans-serif;
  font-weight: 900;
  background-color: #2F9C95;
}

h {
  color: #E5F9E0;
}

html,
body {
  background-color: #2F9C95;
}
</style>
