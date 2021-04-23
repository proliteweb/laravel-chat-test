<template>
  <div class="message" v-if="message">
    <p class="message-file" v-if="isMessageTypeFile(message)">
      <a :href="message.message.file" target="_blank">
        <img :src="message.message.file" class="img-fluid img-preview" alt="" v-if="message.message.is_image">
        <span v-else>{{ message.message.original_name }}</span>
      </a>
    </p>
    <p class="message-text" v-else>{{ message.message }}</p>
    <span class="badge">{{ message.id }}</span>
  </div>
</template>
<script>
export default {
  name: 'chat-message',

  data() {
    return {
    }
  },
  props: ['message'],
  methods: {
    isMessageTypeFile(message) {
      return message.type === 'file';
    },
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

.attach {
  cursor: pointer;
}

.img-preview {
  max-width: 150px;
}

</style>
