<template>
  <div class="container">
    <chat></chat>
  </div>
</template>

<script>
import Chat from './components/Chat'

export default {
  name: "App",
  components: {
    'chat': Chat
  }
}
</script>
