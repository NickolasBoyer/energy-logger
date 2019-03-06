<template>
  <div id="app">
    <img alt="logo" src="./assets/logo.png">
    <Graph/>
    <EnergyButtons/>
    <button @click="resetData" > Reset data </button>
  </div>
</template>

<script>
import Graph from './components/Graph.vue'
import EnergyButtons from './components/EnergyButtons.vue'
import { displayNotification, getCurrentDate, getCurrentHour, storeTimePoint, resetData } from './utils.js'

export default {
  name: 'app',
  components: {
    Graph,
    EnergyButtons
  },
  created () {
    // resetData()
    // request notification access
    if (Notification.permission !== 'granted') {
      Notification.requestPermission(function(status) {
        console.log('Notification permission status:', status);
      });
    }
  },
  methods: {
    resetData () {
      if(prompt('Sure?') !== 'yes') return
      return resetData()
    }
  }
}
</script>

<style lang="scss">
html {
  background-color: black;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  margin-top: 60px;
}
</style>
