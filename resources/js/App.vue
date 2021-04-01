<template>
  <div id="app">
    <header class="row">
      <div class="col-6 pt-3 ">
        <router-link class="btn btn-info ml-5" to="/deals">Deals</router-link>
        <router-link class="btn btn-info ml-5" to="/my-deals">My Deals</router-link>
        <router-link class="btn btn-info ml-5" to="/chats">Chats</router-link>
      </div>
      <div class="col-3 offset-3">
        <user-info></user-info>

      </div>
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
