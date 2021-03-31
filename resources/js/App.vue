<template>
  <div id="app">
    <header class="d-flex justify-content-between">
      <router-link to="/deals">Deals</router-link>
      <user-info></user-info>
    </header>
    <!--    <router-link :to="/deal">Deals</router-link>-->
    <router-view></router-view>
  </div>
</template>

<script>
import UserInfo from './components/UserInfo'

export default {
  name: "App",
  components: {
    "user-info": UserInfo
  }
}
</script>
