<template>
  <a-dropdown style="display: inline-block; height: 100%; vertical-align: initial" >
    <span style="cursor: pointer">
      <a-avatar class="avatar" size="small" shape="circle" src="https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png"/>
      <span>admin</span>
    </span>
    <a-menu style="width: 150px" slot="overlay" @click='handleClick'>
      <a-menu-item key="toggleMenu">
        <a-icon type="user" />
        <span>收缩菜单</span>
      </a-menu-item>
      <a-menu-item key='layout'>
        <a-icon type="setting" />
        <span>切换布局</span>
      </a-menu-item>
      <a-menu-divider />
      <a-menu-item key='loginOut'>
        <a-icon type="poweroff" style='color:red'/>
          <span>退出登录</span>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
export default {
  name: 'HeaderAvatar',
  computed: {
  },
  methods: {
    handleClick ({ key }) {
      if (key === 'loginOut') {
        this.$store.dispatch('app_logout').then(() => {
          this.$router.push('/login')
        })
      } else if (key === 'toggleMenu') {
        this.$store.dispatch('toggle_collapsed')
      } else if (key === 'layout') {
        if (this.$store.getters.menuPosition === 'side') {
          this.$store.commit('CHANGE_MENU_POSITION', 'header')
        } else {
          this.$store.commit('CHANGE_MENU_POSITION', 'side')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .avatar{
    margin: 20px 4px 20px 0;
    color: #1890ff;
    background: hsla(0,0%,100%,.85);
    vertical-align: middle;
  }
</style>
