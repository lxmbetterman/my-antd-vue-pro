<template>
<!-- 这是layout布局页面，包括 菜单栏，顶部，以及children路由渲染部分 router-view -->
  <a-layout class='app-wrapper'>
      <lay-side class='unableSelect' v-if='$store.getters.menuPosition==="side"'></lay-side>
      <!-- <drawer :open-drawer="showSetting" placement="right"  @change="onSettingDrawerChange">
        <div class="setting" slot="handler">
          <a-icon :type="showSetting ? 'close' : 'setting'" />
        </div>
        <div style='width:200px;backgroundColor:#fff;height:200vh'> ??</div>
      </drawer> -->

      <a-layout>
        <lay-header></lay-header>
        <a-layout-content>
          <div class='tab-container unableSelect'>
              <a-tabs @change="callback" type="card">
                <a-tab-pane tab="Tab 11111" key="1"></a-tab-pane>
                <a-tab-pane tab="Tab 22222" key="2"></a-tab-pane>
                <a-tab-pane tab="Tab 33333" key="3"></a-tab-pane>
                <a-tab-pane tab="Tab 44444" key="4"></a-tab-pane>
                <a-tab-pane tab="Tab 55555" key="5"></a-tab-pane>
                <a-tab-pane tab="Tab 66666" key="6"></a-tab-pane>
                <a-tab-pane tab="Tab 77777" key="7"></a-tab-pane>
                <a-tab-pane tab="Tab 88888" key="8"></a-tab-pane>
              </a-tabs>
          </div>
          <div class='main-view' @scroll="testScroll">
            <router-view class='main-view-root'></router-view>
          </div>
        </a-layout-content>
        <a-layout-footer>
          lxm's antd-vue-pro 2019©lxm
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </template>

<script>
import LaySide from './layout-side'
import LayHeader from './layout-header'
import Drawer from '../tools/Drawer'

export default {
  components: { LaySide, LayHeader, Drawer },
  data () {
    return {
      showSetting: false,
      showArrow: false
      // isScrollY: false // 判断是否有y滚动条，如果有就要留灰色滚动条边距#f1f1f1
    }
  },
  methods: {
    onSettingDrawerChange (val) {
      this.showSetting = val
    },
    callback (key) {
      console.log(key)
    },
    test () {
      console.log(this.$refs)
    },
    testScroll (e) {
      console.log(e)
    }

  },
  mounted () {
    // this.handleMoveArrow()
  }
}

</script>
<style lang='scss' scoped>
  .app-wrapper{
    width: 100%;
    height: 100%;
    min-height: 100vh;
    overflow: hidden;
  }
  .setting{
    background-color: #1890ff;
    color: #fff;
    border-radius: 5px 0 0 5px;
    line-height: 33px;
    font-size: 18px;
    width: 30px;
    height: 30px;
    opacity: .8;
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
  }

  .tab-container{
    height: auto;
    // background-color: #f1f1f1;
    overflow: hidden;
    padding: 0 50px;
    padding-left: 30px;
    overflow: hidden;
  }

  .main-view{
    height: calc(100vh - 152px);
    overflow: auto;
    background-color: #f1f1f1;
    margin-top:-16px;
    padding-right: 5px;
    padding-left: 6px;
    .main-view-root{
      background-color: #fff;
      min-height: calc(100vh - 152px);
      height: auto;
      overflow: visible;
      padding: 5px;
    }
  }
</style>
