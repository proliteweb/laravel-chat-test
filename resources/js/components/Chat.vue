<template>
  <div class="container">
    <div class="messages">
    </div>
    <div class="row">
      <div class="col-sm-12">
        <div class="history">
          <div class="message" v-for="message in messages">
            <img :src="getUser(message.user_id).profile.avatar" :width="30" alt="">
            <p>{{ getUser(message.user_id).full_name }}</p>
            {{ message.message }}
          </div>
        </div>
        <input type="text" class="form-control mt-3" v-model="textMessage" @keyup.enter="sendMessage">
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'chat',
  data() {
    return {
      messages: [],
      users: [],
      id: this.$route.params['id'],
      textMessage: '',
    }
  },
  mounted() {
    window.Echo.private(`chats.${this.id}`)
        .listen('MessageSubmitted', ({message}) => {
          this.messages.push(message);
        })
    this.axios.get(`/account/cabinet/chats/${this.id}`).then(({data}) => {
      console.log(data)
    })
  },
  methods: {
    sendMessage() {
      axios.post(`/account/cabinet/chats/${this.id}`, {body: this.textMessage});
      this.messages.push(this.textMessage);
      this.textMessage = '';
    },
    getUser(id){
      return this.users[id];
    }
  }
}
</script>
