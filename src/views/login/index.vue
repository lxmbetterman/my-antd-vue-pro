<!--  -->
<template>
  <div>
    this is Login Page
    <a-button type='primary' @click="login" :loading='loading'> 登 录 </a-button>
    <a-button type='primary' @click="testAixos" :loading='loading'> 接口 </a-button>

  </div>
</template>

<script>
export default {
  data () {
    return {
      redirect: undefined,
      loading: false
    }
  },
  methods: {
    login () {
      this.loading = true
      this.$store.dispatch('app_login').then(() => {
        this.$router.push(this.redirect || '/index')
        this.loading = true
      })
    },
    testAixos () {
      this.axios.get('https://gtxof9ehb8.execute-api.cn-north-1.amazonaws.com.cn/dev/meta?type=1', {
      }).then((res) => {
        console.log(res)
      })
    }
  },
  mounted () {
  },
  created () {
    this.redirect = (this.$route.query && this.$route.query.redirect) || ''
  }
}

</script>
<style lang='scss' scoped>
</style>
