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
              console.log(notification);
              this.$notify(notification.data.title + '<br>' + notification.data.message)
          });

    this.loadNotifications()
  },

  methods: {
    loadNotifications(){
      this.axios.get('/user/notifications/unread').then((response) => {
        this.user = response.data.data
      })
    }
  }
}
</script>
