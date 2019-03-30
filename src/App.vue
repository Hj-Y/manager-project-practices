<template>
  <div id="app">
    <router-link to="/">首页</router-link>
    <router-link to="/login">登录页</router-link>
    <router-view></router-view>
    
  </div>
</template>

<script>


export default {
  name: 'app',
  
}
</script>

<style>

</style>
