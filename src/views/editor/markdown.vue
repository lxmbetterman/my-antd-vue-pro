<!--  -->
<template>
  <div>
    <mavon-editor ref='md' @htmlCode='test2' v-model="value" @change='test3'/>
    <a-button @click="test">aaa</a-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: '==*请编辑你想填写的markdown内容*=='
    }
  },
  mounted () {
    console.log(this.$refs)
  },
  methods: {
    test () {
      console.log(this.$refs.md)
    },
    test2 (a, b) {
      console.log(a, b)
    },
    test3 (a, b) {
      console.log(a, b)
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
