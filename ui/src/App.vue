<template>
  <div id="nav">
    <router-link to="/">Players</router-link>
  </div>
  <router-view />
</template>

<style lang="scss">
@font-face {
  font-family: 'Pokemon Fire Red';
  font-style: normal;
  font-weight: normal;
  src: local('Pokemon Fire Red Regular') url('~@/assets/pokemon_fire_red.woff')
    format('woff');
}

#app {
  font-family: monospace;
  // font-family: 'Pokemon Fire Red Regular';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 16px;
  background-color: gray;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
