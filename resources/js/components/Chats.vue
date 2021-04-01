<template>
  <div class="container">
    <div class="messages">
    </div>
    <div class="row">
      <div class="col-sm-12">

      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'chats',
  data() {
    return {
      chats: [],
    }
  },
  mounted() {
    axios.get(`/account/cabinet/chats`).then(({data}) => {
      this.chats = data.data;
      console.log(this.chats)
    })
  },
  methods: {
  }
}
</script>
