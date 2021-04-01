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
                <p>{{ chat.last_message.message }}</p>
              </div>
              <div class="">
                <p>{{ chat.last_message.created_at }}</p>
                <p class="badge badge-info">{{ chat.unread_messages_count }}</p>
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
      console.log(this.chats[0])
    })
  },
  methods: {
    openChat(chatId){
      this.$router.push(`/chats/${chatId}`)
    }
  }
}
</script>
