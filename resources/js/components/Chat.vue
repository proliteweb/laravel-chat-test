<template>
  <div class="container">
    <div class="messages">
    </div>
    <div class="row">
      <div class="col-sm-8">
        <div class="history card" v-if="chat" v-chat-scroll>
          <div class="card-body">
            <div class="message card w-75 p-2 mb-1" v-for="message in messages"
                 :class="[isOwnerMessage(message.user_id) ? 'right' : '', !isLastMessageOfUser(message.user_id) ? 'mt-4' : '']">
              <div class="user d-flex" v-if="!isLastMessageOfUser(message.user_id)">
                <img class="img-thumbnail" :src="getUser(message.user_id).profile.avatar" :width="40" alt="">
                <p class="pl-3">{{ getUser(message.user_id).full_name }}</p>
              </div>
              {{ setPrevMessageUserId(message.user_id) }}
              {{ message.message }}
            </div>
          </div>
        </div>
        <input type="text" class="form-control mt-3" v-model="textMessage" @keyup.enter="sendMessage" autofocus>
      </div>
      <div class="col-4 mt-4">
        <div class="list-group">
          <li class="list-group-item" v-for="user in users">
            <img :src="user.profile.avatar" width="50" class="img-thumbnail" alt="">
            <span>{{ user.full_name }}</span>
          </li>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'chat',
  data() {
    return {
      prevMessageUserId: null,
      chat: null,
      messages: [],
      users: [],
      id: this.$route.params['id'],
      textMessage: '',
    }
  },
  mounted() {
    window.Echo.private(`chats.${this.id}`)
        .listen('.MessageSubmitted', (res) => {
          this.messages.push(res.message);
        })
    this.axios.get(`/account/cabinet/chats/${this.id}`)
        .then(({data}) => {
          this.chat = data.data;
          this.messages = this.reverseMessagesOrder(this.chat.messages.data);
          this.users = data.users;
        })
  },
  methods: {
    reverseMessagesOrder(messages = []) {
      return messages.reverse()
    },
    sendMessage() {
      axios.post(`/account/cabinet/chats/${this.id}`, {message: this.textMessage})
          .then(({data}) => {
            this.messages.push(data.data)
          });
      this.textMessage = '';
    },
    isLastMessageOfUser(userId) {
      return this.prevMessageUserId === userId
    },
    setPrevMessageUserId(userId) {
      this.prevMessageUserId = userId
    },
    getUser(id) {
      return this.users[id];
    },
    isOwnerMessage(userId) {
      return this.getUser(userId).is_current
    }
  }
}
</script>
<style lang="scss">
.right {
  margin-left: 25%;
}

.history {
  overflow-y: auto;
  height: 60vh;
}

.message {
  position: relative;
}

.del-message {
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;

  opacity: 0.3;
}
</style>
