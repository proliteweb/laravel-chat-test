<template>
  <div id="app">
    <header>
      <router-link to="/deals">Deals</router-link>
    </header>
<!--    <router-link :to="/deal">Deals</router-link>-->
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: "App",
  components: {
  }
}
</script>
