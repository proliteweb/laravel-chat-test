<template>
  <div class="profile" v-if="user">
    <div class="card d-flex">
      <div class="card-body">
        <img :src="user.profile.avatar" :width="50" alt="">
        <a :href="user.id">{{ user.full_name }}</a>
        <a class="badge badge-info" href="#" @click="toggleUserType">{{ user.type === 'performer' ? 'Исполнитель' : 'Заказчик' }}</a>
        <div class="links pt-3">
          <router-link :to="`/cabinet/notifications/config`">Настройка уведомлений</router-link>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'UserInfo',
  data() {
    return {
      user: null
    }
  },

  mounted() {
    this.loadUser()
  },

  methods: {
    toggleUserType() {
      this.axios.post('/account/cabinet/switch-type')
          .then(() => {
            this.loadUser()
          })
          .catch( (error) => {
            if (error.response && error.response.status === 418) {
              this.$notify(error.response.data.message)
              this.$router.push('/cabinet/verification/phone')
            }
          });
    },
    loadUser() {
      this.axios.get('/user/info').then((response) => {
        this.user = response.data.data
      })
    }
  }
}
</script>
