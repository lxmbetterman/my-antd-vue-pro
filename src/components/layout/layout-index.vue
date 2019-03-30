<template>
<!-- 这是layout布局页面，包括 菜单栏，顶部，以及children路由渲染部分 router-view -->
  <a-layout class='app-wrapper'>
      <lay-side class='unableSelect'></lay-side>
      <a-layout>
        <a-layout-header class='unableSelect'>
          <span style='color:#fff'>this is Layout page</span>
          <a-button type='danger' @click="loginOut"> 退 出 </a-button>
          <a-button @click="$router.go(-1)"> 返回?? </a-button>
          <a-button @click="toggleMenu"> toggleMenu?? </a-button>
          <span style='color:red'>{{$store.getters.token}}??</span>
        </a-layout-header>
        <a-layout-content>
          这是子路由
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer>Footer</a-layout-footer>
      </a-layout>
    </a-layout>
</template>

<script>
import LaySide from './layout-side'
export default {
  components: { LaySide },
  data () {
    return {
      current: ['mail'],
      openKeys: ['sub1']
    }
  },
  methods: {
    loginOut () {
      this.$store.dispatch('app_logout').then(() => {
        this.$router.push('/login')
        location.reload()
      })
    },
    toggleMenu () {
      this.$store.dispatch('toggle_collapsed')
    }
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
</style>
