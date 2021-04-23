<template>
  <div class="container">
    <hr>
    <div class="messages">
    </div>
    <div class="row">

      <div class="active" v-if="active">
        <h3>Active</h3>
        <div class="col-sm-12 mt-4" v-for="deal in active">
          <router-link :to="`/deals/${deal.slug}`">
            <img :src="deal.customer.profile.avatar" :width="80" alt="">
            {{ deal.title }}
          </router-link>
        </div>
      </div>

      <div class="completed" v-if="completed">
        <h3>Completed</h3>
        <div class="col-sm-12 mt-4" v-for="deal in completed">
          <router-link :to="`/deals/${deal.slug}`">
            <img :src="deal.customer.profile.avatar" :width="80" alt="">
            {{ deal.title }}
          </router-link>
        </div>
      </div>
<!--      <div class="col-sm-12 mt-4" v-for="deal in deals">-->
        <!--        <img src="{{ deal.customer.profile.avatar }}" alt="">-->
<!--        <router-link :to="`/deals/${deal.slug}`">{{ deal.title }}</router-link>-->
<!--      </div>-->
    </div>
  </div>
</template>


<script>
export default {
  name: 'my-deals',
  data() {
    return {
      completed: null,
      active: null,
    }
  },

  mounted() {
    this.axios.get('/account/cabinet/deals/completed').then((response) => {
      this.completed = response.data.data;
    })
    this.axios.get('/account/cabinet/deals/active').then((response) => {
      this.active = response.data.data;
    })
  },

  methods: {}
}
</script>
