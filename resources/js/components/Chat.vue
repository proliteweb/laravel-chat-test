<template>
  <div class="container">
    <hr>
    <div class="messages">
    </div>
    <div class="row">
      <div class="col-sm-12">
        <textarea id="" rows="10" placeholder="Message" class="form-control" readonly>{{ messages.join('\n') }}</textarea>
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
      textMessage: '',
    }
  },
  mounted() {
    window.Echo.private('chat.1')
        .listen('.PrivateMessage', ({message, user}) => {
          this.messages.push(user.name + ': ' + message);
        })
  },
  methods: {
    sendMessage() {
      axios.post('/messages', {body: this.textMessage, chatId: 1});
      this.messages.push(this.textMessage);
      this.textMessage = '';
    }
  }
}
</script>
