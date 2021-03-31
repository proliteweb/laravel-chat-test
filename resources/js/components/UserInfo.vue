<template>
  <div class="profile" v-if="user">
    <div class="card d-flex">
      <div class="card-body">
        <img :src="user.profile.avatar" :width="50" alt="">
        <a :href="user.id">{{ user.full_name }}</a>
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
    this.axios.get('/user/info').then((response) => {
      this.user = response.data.data
    })
  },

  methods: {}
}
</script>
