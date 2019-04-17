<!-- 废弃 -->
<template>
  <div ref="outer" class='outer-container'>
    <div ref='inner' class='inner-container'>
      <div v-for="i in 100" :key=i style='width:30px;border:1px solid #ddd;height:20px;display:inline-block'>
          {{i}}
      </div>
    </div>
    <div v-if='showBothArrow' class='arrow-left' @click="testLeft">《</div>
    <div v-if='showBothArrow' class='arrow-right'>》</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showBothArrow: false
    }
  },
  methods: {
    measureStatus () {
      if (this.$refs.outer.clientWidth < this.$refs.outer.scrollWidth) {
        this.showBothArrow = true
      } else {
        this.showBothArrow = false
      }
    },
    testLeft () {
    }
  },
  mounted () {
    this.measureStatus()
  }
}

</script>
<style lang='scss' scoped>
  .outer-container{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    background-color: red;
  }
  .inner-container{
    height: 80%;
    width: auto;
    background-color: blue;
    white-space: nowrap;
  }
  .arrow-left{
    position: absolute;
    top:10px;
    left: 5px;
    cursor: pointer;
  }
  .arrow-right{
    position: absolute;
    top:10px;
    right: 5px;
    cursor: pointer;
  }
</style>
