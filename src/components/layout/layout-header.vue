<!--  -->
<template>
  <a-layout-header class='unableSelect'>
    <div class='side-header-content'>
      <a-row>
        <a-col class='header-col-logo' :span="8">
          <div v-if='$store.getters.menuPosition==="header"'>
            <img src="../../assets/logo.png" alt="">
            <h1 >antd-vue-pro</h1>
          </div>
        </a-col>
        <a-col class='header-col-menu' :span="8">
          <i-menu style="height: 64px; line-height: 64px;" mode="horizontal" :menu="$store.getters.routers"
            v-if='$store.getters.menuPosition==="header"'/>
        </a-col>
        <a-col class='header-col-options' :span="8">
          <!-- <a-button style='display:inline-block' type='danger' @click="loginOut">退出</a-button>
          <a-button style='display:inline-block' @click="test"> 布局 </a-button>
          <a-button style='display:inline-block' @click="toggleMenu">.</a-button>
          <span style='color:red'>{{$store.getters.token}}??</span> -->
          <header-avatar></header-avatar>
        </a-col>
      </a-row>
    </div>
  </a-layout-header>
</template>

<script>
import IMenu from '../menu/menu.js'
import HeaderAvatar from './header-avatar.vue'
export default {
  components: { IMenu, HeaderAvatar },
  data () {
    return {}
  },
  methods: {
    toggleMenu () {
      this.$store.dispatch('layout/toggle_collapsed')
    },
    onSelect () {
    }

  }
}

</script>
<style lang='scss' scoped>
.ant-layout-header{  // 重置layout-header 的默认左右padding
  padding: 0;
  color:#777
}
.side-header-content{
  max-width: 1500px;
  margin: auto;
}
.flex-content{
  display: flex;
  justify-content:space-between;
  align-items:center;
  .flex-content-logo{
    flex:0 0 180px;
    background-color: red
  }
  .flex-content-menu{
    flex:0 1 auto;
    background-color: green;
    overflow: hidden;
    width: auto;
  }
  .flex-content-options{
    flex:0 0 180px;
    background-color: blue
  }
}
.header-col-logo {
  width: 230px;
  cursor: pointer;
  img{
    width: 35px;
    display: inline-block;
    vertical-align: middle;
  }
  h1{
    display: inline-block;
    color:#fff;
    line-height: 62px;
    margin: 0;
    padding: 0;
    padding-left: 10px;
    vertical-align: top;
    font-weight: 500;
    font-size: 16px;

  }
}
.header-col-menu{
  width: calc(100% - 550px);
  overflow: hidden;
}
.header-col-options{
  width:320px;
  text-align: center;
}
</style>
