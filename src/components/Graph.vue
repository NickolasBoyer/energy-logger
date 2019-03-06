<template>
  <div class="hello">
    <button @click="updateData">refresh data </button>
    <div class="ct-chart ct-square"></div>
  </div>
</template>

<script>
import Chartist from 'chartist'
import { getData, displayNotification } from '../utils.js'

export default {
  name: 'Graph',
  props: {
    msg: String
  },
  data () {
    return {
      data: {}
    }
  },
  mounted() {
    this.updateData()
  },
  computed: {
    graphData() {
      return Object.values(this.data)
        .map(day => {
          return day.map(p => ({x: p.hour, y: p.energyRating}))
        })   
    }
  },
  watch: {
    graphData(val) {
    console.log('new graph data', this.data, val)
    var chart = new Chartist.Line('.ct-chart', {
        labels: [6, 7, 8, 9, 10, 11, 12, 13 ,14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
        series: [
          ...val
        ]
      }, {
        fullWidth: true,
        chartPadding: {
          right: 10
        },
        lineSmooth: Chartist.Interpolation.cardinal({
          fillHoles: true,
        }),
        high: 10,
        low: 0,
        showArea: true,
        axisY: {
          onlyInteger: true,
        }
      }
    );
    }
  },
  methods: {
    updateData() {
      getData()
        .then(data => this.data = data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
a {
  color: #42b983;
}
</style>
