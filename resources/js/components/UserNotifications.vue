<template>
  <ul>
    <li v-for="notification in notifications" v-if="notifications">
      <b>{{ notification.data.title }}</b>
      <span>{{ notification.data.message }}</span>
    </li>
  </ul>
</template>


<script>
export default {
  name: 'user-notifications',
  data() {
    return {
      user: null,
      notifications: []
    }
  },

  mounted() {
    const userId = 2;
    Echo.private('users.notifications.' + userId)
        .notification((notification) => {
          this.notifications.push(notification)
          this.$notify(notification.data.title + '<br>' + notification.data.message)
        });
    // this.loadNotifications()
  },

  methods: {
    // loadNotifications() {
    //   this.axios.get('/user/notifications/unread').then((response) => {
    //     this.user = response.data.data
    //   })
    // }
  }
}
</script>
