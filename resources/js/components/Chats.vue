<template>
  <div class="container">
    <div class="messages">
    </div>
    <div class="row">
      <div class="col-6" v-if="chats">
        <div class="card">
          <div class="list-group">
            <a class="chat-link-container" :href="`/chats/${chat.id}`" v-for="chat in chats">
              <div class="list-group-item chat-item d-flex justify-content-between" style="cursor: pointer">
                <div class="image">
                  <img class="img-thumbnail" :src="chat.user.profile.avatar" width="50" alt="">
                </div>
                <div class="profile ml-3">
                  <p>{{ chat.user.full_name }}</p>
                  <chat-message :message="chat.last_message"></chat-message>
                </div>
                <div class="">
                  <p>{{ getLastMessageColumn(chat, 'created_at') }}</p>
                  <p class="badge badge-info">{{ getLastMessageColumn(chat, 'unread_messages_count') }}</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div class="col-2 ml-4">
        types
      </div>
    </div>
  </div>
</template>


<script>
import chatMessage from "./ChatMessage";
import ChatRoomsInitialized from '../class/ChatRoomsInitialized'
import lodash from "lodash";

export default {
  name: 'chats',
  components: {
    chatMessage
  },
  data() {
    return {
      chats: null,
    }
  },
  mounted() {
    this.getLIstData();
    const room = `chats.user.2`;
    if (!ChatRoomsInitialized.hasSubscribedRoom(room)) {
      ChatRoomsInitialized.addSubscribedRoom(room)
      window.Echo.private(room)
          .listen('.MessageSubmitted', ({message}) => {
            this.replaceLastMessage(message)
          })
    }
  },
  methods: {
    replaceLastMessage(message) {
      this.chats[message.chat_id].last_message = message;
    },
    getLIstData() {
      axios.get(`/account/cabinet/chats`).then(({data}) => {
        this.chats = lodash.keyBy(data.data, 'id');
      })
    },
    openChat(chatId) {
      this.$router.push(`/chats/${chatId}`)
    },
    getLastMessageColumn(chat, col) {
      if (!chat?.last_message ?? false) {
        return '';
      }
      return chat.last_message[col]
    }
  },
}
</script>

<style lang="scss">
.chat-link-container {
  display: block;
  text-decoration: none !important;
}
</style>