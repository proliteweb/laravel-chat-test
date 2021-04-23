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
    Echo.private('App.Models.User.' + userId)
        .notification((notification) => {
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
