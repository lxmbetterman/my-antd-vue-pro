<!--  -->
<template>
  <div>
    this is Login Page
    <a-button type='primary' @click="login" :loading='loading'> 登 录 </a-button>
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
