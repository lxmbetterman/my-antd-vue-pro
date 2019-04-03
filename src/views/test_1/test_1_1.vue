<!--  -->
<template>
  <div>
    <div style='height:100px;backgroundColor:#fff;'>

    </div>
    <div style='height:200vh'></div>
    <a-back-top />
    Scroll down to see the bottom-right
    <strong @click="scrollTop" style="color: rgba(64, 64, 64, 0.6)"> toTop </strong>
    button.
  </div>

</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    scrollTop () {
      let self = this
      let PEle = this.$el.parentElement
      let timer = setInterval(function () {
        var scrollTop = PEle.scrollTop
        var ispeed = Math.floor(-scrollTop / 6)
        console.log(ispeed)
        if (scrollTop === 0) {
          clearInterval(timer)
        }
        self.$el.parentElement.scrollTop = scrollTop + ispeed
      }, 40)
    }
  }
}

</script>
<style lang='scss' scoped>
  // .outer-container {
  //   width: 360px;
  //   height: 200px;
  //   position: relative;
  //   overflow: hidden;
  // }

  // .inner-container {
  //   position: absolute;
  //   left: 0;
  //   top: 0;
  //   right: -17px;
  //   bottom: 0;
  //   overflow-x: hidden;
  //   overflow-y: scroll;
  // }

</style>
