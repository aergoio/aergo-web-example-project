<template>
  <div class="home">
    <p class="logos">
      <img alt="Aergo logo" src="../assets/aergo.svg" height="75">
      +<img alt="Vue logo" src="../assets/logo.png" width="100">
    </p>
    <HelloWorld msg="Welcome to Your Aergo App Powered by Vue.js"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  components: {
    HelloWorld,
  },
};
</script>

<style>
.logos {
  font-size: 2em;
}
.logos img {
  vertical-align: middle;
}
</style>
