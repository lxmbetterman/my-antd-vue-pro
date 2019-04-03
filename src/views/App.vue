<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import enquireScreen from '../utils/device'
export default {
  data () {
    return {}
  },
  created () { // 关于移动端和pc端的设备类型判断需要在create中进行
    enquireScreen(deviceType => {
      if (deviceType === 0) {
        this.$store.dispatch('toggle_collapsed', true)
      } else if (deviceType === 1) {
      } else {
        this.$store.dispatch('toggle_collapsed', false)
      }
    })
  }
}
</script>
