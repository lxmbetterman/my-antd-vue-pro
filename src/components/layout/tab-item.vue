<!--  -->
<template>
  <div class='tab-container unableSelect'>
      <a-tabs type="card">
        <a-tab-pane :id="page.fullPath" :key="page.fullPath" v-for="page in pageList">
          <span slot="tab" :pagekey="page.fullPath">{{page.name}}</span>
        </a-tab-pane>
      </a-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pageList: []
    }
  },
  created () {
    this.pageList.push(this.$route)
  },
  watch: {
    '$route': function (newRoute, oldRoute) {
      // this.activePage = newRoute.fullPath
      this.pageList.push(newRoute)
    }
  }
}

</script>
<style lang='scss' scoped>
.tab-container{
    height: auto;
    // background-color: #f1f1f1;
    overflow: hidden;
    padding: 0 50px;
    padding-left: 30px;
    overflow: hidden;
  }
</style>
