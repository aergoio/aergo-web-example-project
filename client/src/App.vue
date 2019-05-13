<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/contract">Smart Contract</router-link>
      <router-link to="/vue">Vue.js</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-bottom: 4em;
}

a {
  color: #2c3e50;
  text-decoration: none;
  border-bottom: 2px solid #ccc;
  &.router-link-exact-active, &:hover {
    border-color: #FF0097;
  }
}

h2 {
  margin: 1.66em 0 0.83em;
}

#app {
  max-width: 900px;
  margin: 0 auto;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    margin-right: 1em;
    &:last-child {
      margin-right: 0;
    }
  }
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
