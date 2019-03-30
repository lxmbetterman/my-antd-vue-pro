<template>
  <div class="home">
    <h1>This is an home page {{$store.getters.roles}}</h1>
    <a-button type="primary" @click="$router.push('/test1')">test1-1</a-button>
    <a-button  @click="$router.push('/test2')">Default</a-button>
    <a-button type="dashed">Dashed</a-button>
    <a-button type="danger">Danger</a-button>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'home'
}
</script>
