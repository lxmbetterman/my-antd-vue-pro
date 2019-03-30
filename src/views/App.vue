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
      // tablet
      if (deviceType === 0) {
      } else if (deviceType === 1) {
      } else {
      }
    })
  }
}
</script>
