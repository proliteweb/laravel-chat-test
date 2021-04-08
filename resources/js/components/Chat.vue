<template>
  <div class="container">
    <div class="messages">
    </div>
    <div class="row" v-if="chat">
      <div class="col-sm-8">
        <div class="card history" v-chat-scroll>
          <div class="card-body">
            <div class="message card w-75 p-2 mb-1" v-for="message in messages"
                 :class="getMessageCssClasses(message)">
              <div class="user d-flex" v-if="!isLastMessageOfUser(message.user_id)">
                <img class="img-thumbnail" :src="getUser(message.user_id).profile.avatar" :width="40" alt="">
                <p class="pl-3">{{ getUser(message.user_id).full_name }}</p>
              </div>
              <p class="message-file" v-if="isMessageTypeFile(message)">
                <a :href="message.message.file" target="_blank">
                  <img :src="message.message.file" class="img-fluid" width="150" alt="" v-if="message.message.is_image">
                  <span v-else>{{ message.message.original_name }}</span>
                </a>
              </p>
              <p class="message-text" v-else>{{ message.message }}</p>
              {{ setLastMessage(message) }}
            </div>
          </div>
        </div>
        <div class="d-flex">
          <upload-files></upload-files>
          <input type="text" class="form-control mt-3" v-model="textMessage" @keyup.enter="sendMessage" placeholder="сообщение..." autofocus>
        </div>
      </div>
      <div class="col-4 mt-4">
        <ul class="list-group">
          <li class="list-group-item" v-for="user in users">
            <img :src="user.profile.avatar" width="50" class="img-thumbnail" alt="">
            <span>{{ user.full_name }}</span>
          </li>
        </ul>
        <div class="card mt-4">
          <div class="card-body">
            <span class="toggleFavorite" @click="toggleFavorite">
              <i class="fas fa-heart" v-if="chat.is_favorite"></i>
              <i class="far fa-heart" v-else></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import lodash from 'lodash'
import UploadFiles from "./UploadFiles";
import {ChatMessagesOrder} from '../class/ChatMessagesOrder'
export default {
  name: 'chat',
  components: {
    UploadFiles
  },
  data() {
    return {
      chat: null,
      messages: [],
      users: [],
      id: this.$route.params['id'],
      textMessage: '',
    }
  },
  mounted() {
    console.log(this.$store.state.ChatUploadFiles.hasFiles)
    window.Echo.private(`chats.${this.id}`)
        .listen('.MessageSubmitted', (res) => {
          this.pushMessage(res.message);
        })
        .listen('.MessagesWatched', (res) => {
          console.log('MessagesWatched')
          this.replaceMessages(res.messages)
        })
    this.axios.get(`/account/cabinet/chats/${this.id}`)
        .then(({data}) => {
          this.chat = data.data;
          this.messages = this.reverseMessagesOrder(this.chat.messages.data);
          this.users = this.usersKeyBy(data.users);
        })
  },
  methods: {
    reverseMessagesOrder(messages = []) {
      return lodash.keyBy(messages.reverse(), 'id');
    },
    usersKeyBy(users) {
      return lodash.keyBy(users, 'id')
    },
    sendMessage() {
      axios.post(`/account/cabinet/chats/${this.id}`, {message: this.textMessage})
          .then(({data}) => {
            this.pushMessage(data.data)
          });
      this.textMessage = '';
    },
    pushMessage(message) {
      this.$set(this.messages, message.id, message);
    },
    replaceMessages(messages) {
      messages.forEach(message => {
        this.pushMessage(message)
      })
    },
    setLastMessage(message) {
      ChatMessagesOrder.setLastMessage(message)
    },
    isLastMessageOfUser(userId) {
      if (typeof ChatMessagesOrder.getLastMessage() === 'undefined') {
        return false;
      }
      return ChatMessagesOrder.getLastMessage().user_id === userId
    },
    getMessageCssClasses(message) {
      const classes = [];
      if (this.isOwnerMessage(message.user_id)) {
        classes.push('right')
      }
      if (!this.isLastMessageOfUser(message.user_id)) {
        classes.push('mt-4')
      }
      if (!message.is_watched) {
        classes.push('unwatched')
      }
      return classes;
    },
    isMessageTypeFile(message){
      return message.type === 'file';
    },
    getUser(id) {
      return this.users[id];
    },
    isOwnerMessage(userId) {
      return this.getUser(userId).is_current
    }, toggleFavorite() {
      this.axios.post(`/account/cabinet/chats/${this.id}/favorites`)
          .then(({data}) => {
            this.$notify(data.message);
            this.chat.is_favorite = !this.chat.is_favorite;
          })
    }
  }
}
</script>
<style lang="scss" scoped>
.right {
  margin-left: 25%;
}

.history {
  overflow-y: auto;
  height: 60vh;
  background-color: aliceblue;
}

.message {
  position: relative;

  &.unwatched {
    background-color: #b5daf0;
  }
}

.del-message {
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;

  opacity: 0.3;
}

.toggleFavorite {
  cursor: pointer;
  color: #687ac1;
}
.attach{
  cursor: pointer;
}

</style>
