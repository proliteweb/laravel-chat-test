<template>
  <div class="container">
    <hr>
    <div class="messages">
    </div>
    <div class="row">
      <div class="col-sm-12 mt-4" v-for="deal in deals">
        <router-link :to="`/deals/${deal.slug}`">
          <img :src="deal.customer.profile.avatar" :width="80" alt="">
          {{ deal.title }}
        </router-link>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'deals',
  data() {
    return {
      deals: []
    }
  },

  mounted() {
    this.axios.get('/deals').then((response) => {
      this.deals = response.data.data;
    })
  },

  methods: {}
}
</script>
