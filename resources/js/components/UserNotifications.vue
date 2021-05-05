<template>
  <h1>Notification</h1>
</template>


<script>
export default {
  name: 'user-notifications',
  data() {
    return {
      user: null
    }
  },

  mounted() {
    const userId = 1;
    Echo.private('users.notifications.' + userId)
        .notification((notification) => {
          this.$notify(notification.title + '\n' + notification.message)
          console.log(notification);
        });

    // this.loadNotifications()
  },

  methods: {
    loadNotifications(){
      this.axios.get('/user/info').then((response) => {
        this.user = response.data.data
      })
    }
  }
}
</script>
