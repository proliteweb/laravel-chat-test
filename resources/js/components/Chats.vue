<template>
  <div class="container">
    <div class="messages">
    </div>
    <div class="row">
      <div class="col-6" v-if="chats">
        <div class="card">
          <div class="list-group">
            <div class="list-group-item chat-item d-flex justify-content-between" style="cursor: pointer" v-for="chat in chats" @click="openChat(chat.id)">
              <div class="image">
                <img class="img-thumbnail" :src="chat.user.profile.avatar" width="50" alt="">
              </div>
              <div class="profile ml-3">
                <p>{{ chat.user.full_name }}</p>
                <span>{{ getLastMessageColumn(chat, 'message') }}</span>
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
    window.Echo.private(`chats.user.2`)
        .listen('.MessageSubmitted', (res) => {
          console.log(res)
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
