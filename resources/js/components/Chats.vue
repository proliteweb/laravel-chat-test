<template>
  <div class="container">
    <div class="messages">
    </div>
    <div class="row">
      <div class="col-6" v-if="chats">
        <div class="card">
          <div class="card-body">
            <div class="chat-item d-flex justify-content-between" style="cursor: pointer" v-for="chat in chats" @click="openChat(chat.id)">
              <div class="image">
                <img :src="chat.user.profile.avatar" width="50" alt="">
              </div>
              <div class="profile ml-3">
                <p>{{ chat.user.full_name }}</p>
                <p>{{ getLastMessageColumn(chat, 'message') }}</p>
              </div>
              <div class="">
                <p>{{ getLastMessageColumn(chat, 'created_at') }}</p>
                <p class="badge badge-info">{{ getLastMessageColumn(chat, 'unread_messages_count') }}</p>
              </div>
            </div>
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
export default {
  name: 'chats',
  data() {
    return {
      chats: null,
    }
  },
  mounted() {
    axios.get(`/account/cabinet/chats`).then(({data}) => {
      this.chats = data.data;
    })
  },
  methods: {
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
