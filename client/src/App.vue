<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <LogCollector/>
</template>

<script>
import LogCollector from './components/LogCollector.vue'

export default {
  name: 'App',
  components: {
    LogCollector
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 60px;
  min-height: 100vh;
}
</style>
