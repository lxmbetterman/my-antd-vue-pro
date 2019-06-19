<!--  -->
<template>
    <!--v-model="collapsed" 表示 sider布局的展开状态 -->
    <a-layout-sider width='256px' collapsible v-model="collapsed" @collapse='handle_collapse'>
      <div class="logo" @click="$store.dispatch('layout/toggle_collapsed')">
            <img src="../../assets/logo.png" alt="">
            <h1 :class={showProName:collapsed}>antd-vue-pro</h1>
      </div>
      <!-- <div class='menu-side'>
        <div class='menu-side-content'>
          <i-menu :menu='$store.getters.routers' :collapsed='collapsed'></i-menu>
        </div>
      </div> -->
      <div class="outer-container">
        <div class="inner-container">
          <i-menu :menu='$store.getters.routers' :collapsed='collapsed' :singleExpand='false'></i-menu>
        </div>
      </div>
    </a-layout-sider>
</template>

<script>
import IMenu from '../menu/menu.js'
export default {
  components: { IMenu },
  data () {
    return {
      collapsed: this.$store.getters.collapsed // 用一个state变量来控制展开/收起状态
    }
  },
  computed: {
    watch_getters_collapsed () {
      return this.$store.getters.collapsed
    }
  },
  watch: {
    watch_getters_collapsed: function (nweVal, oldVal) {
      this.collapsed = nweVal
    }
  },
  methods: {
    handle_collapse (collapsed, type) {
      this.$store.dispatch('layout/toggle_collapsed')
    }
  }
}

</script>
<style lang='scss' scoped>
.logo{
  height:64px;
  padding-left: 24px;
  padding-top: 16px;
  cursor: pointer;
  overflow: hidden;
  img{
    height: 36px;
    display: inline-block;
    vertical-align: top;
    line-height: 37px;
    margin-bottom: 5px;
  }
  h1{
    font-weight: 600;
    padding: 0;
    margin: 0;
    font-family: "Myriad Pro","Helvetica Neue",Arial,Helvetica,sans-serif;
    font-size: 24px;
    color:#fff;
    display: inline-block;
    padding-left: 8px;
    vertical-align: top;
    line-height: 37px;
    -webkit-transition: all .5s;
    transition: all .25s;
    &.showProName{
      font-size: 10px;

    }
  }
}
.outer-container {
  width: 100%;
  position: relative;
  overflow: hidden;
  height: calc(100vh - 118px);
  background-color: #001529;
}
.inner-container {
  position: absolute;
  left: 0;
  top: 0;
  right: -17px;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
