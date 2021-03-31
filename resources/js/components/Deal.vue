<template>
  <div class="container">
    <hr>
    <div class="messages">
    </div>
    <div class="container" v-if="deal ">
      <div class="row">
        <div class="col-6">
          <p>{{ deal.title }}</p>
          <p>{{ deal.description }}</p>
          <div class="d-flex justify-content-around">
            <b class="text-primary">{{ deal.price_with_currency }}</b>
            <b class="text-primary">{{ getCityName() }}</b>
            <b class="text-primary">{{ getCategoryName() }}</b>
          </div>
        </div>
        <div class="col-3 offset-2">
          <div class="card mt-5 px-0" v-if="hasPerformer()">
            <div class="card-body">
              <div class="d-flex justify-content-around">
                <img :src="deal.customer.profile.avatar" :width="50" class="img-fluid" alt="">
                <a :href="deal.customer.id">{{ deal.customer.full_name }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="card mt-5 px-0 w-25" v-if="hasPerformer()">
          <div class="card-header">выбранный исполнитель</div>
          <div class="card-body">
            <div class="d-flex justify-content-around">
              <img :src="getPerformer().profile.avatar" :width="50" class="img-fluid" alt="">
              <p>{{ getPerformer().full_name }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-5" >
        <h3>Ставки</h3>
        <div class="card w-50 px-0" v-for="bet in getBets()">
          <div class="card-body">
            <div class="d-flex justify-content-around">
              <img :src="bet.performer.profile.avatar" :width="50" class="img-fluid" alt="">
              <a :href="bet.performer.id">{{ bet.performer.full_name }}</a>
              <button class="btn btn-light" v-if="getPermission('can_init_chats')" @click="getChat(bet.performer.id)">Перейти в чат</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'deal',
  data() {
    return {
      deal: null,
      bets: null,
      id: this.$route.params['slug']
    }
  },
  mounted() {
    this.axios.get('/deals/' + this.id).then(({data}) => {
      this.deal = data.data;
      this.bets = data.bids;
    })
  },
  methods: {
    getCategoryName(){
      return this.deal.category.name ?? null
    },
    getCityName(){
      return this.deal.city.name
    },
    getPerformer(){
      return this.deal.performer;
    },
    hasPerformer(){
      return null !== this.getPerformer();
    },
    getBets(){
      return this.bets;
    },
    getPermission(permission){
      return this.deal.permissions[permission];
    },
    getChat($performerId){
      this.axios.get(`/deals/${this.deal.id}/performer/${$performerId}/chat`).then(({data}) => {
        this.$router.push(`/chats/${data.data.id}`)
      })
    }
  }
}
</script>

<style scoped>
  .not_selected{
    opacity: .6;
  }
</style>
