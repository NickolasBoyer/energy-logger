<template>
  <div class="energy">
    <button v-for="i in 10" :key="i" @click="setEnergyLevel(i)" :style="`background-color: hsl(${358 - 20*i}, 97%, 59%);`">{{i}}</button>
  </div>
</template>

<script>
import Chartist from 'chartist'
import { getCurrentDate, getCurrentHour, storeTimePoint } from '../utils.js'

export default {
  name: 'EnergyButtons',
  methods: {
    setEnergyLevel (energyLevel) {
      return storeTimePoint(getCurrentDate(), getCurrentHour(), energyLevel)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
button {
  height: 40px;
  width: 40px;
  margin: 10px;
  border: none;
  
  border-radius: 50%;
  color: white;
  font-weight: bold;
}
</style>
