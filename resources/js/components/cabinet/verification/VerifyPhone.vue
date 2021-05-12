<template>
  <div class="container">
    <h3>Phone Verification</h3>
    <form action="">
      <div class="row w-25 d-flex">
        <input type="text" maxlength="1" v-model="code[0]" class="col-2 p-0 ml-1" required>
        <input type="text" maxlength="1" v-model="code[1]" class="col-2 p-0 ml-1" required>
        <input type="text" maxlength="1" v-model="code[2]" class="col-2 p-0 ml-1" required>
        <input type="text" maxlength="1" v-model="code[3]" class="col-2 p-0 ml-1" required>
      </div>
      <button class="btn btn-secondary" @click.prevent="verify">Send</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "VerifyPhone",
  data() {
    return {
      code: [],
      secretCode: null
    }
  },
  mounted() {
    this.sendCode();
  },
  methods: {
    sendCode() {
      this.axios.post('/account/cabinet/verification/phone')
          .then(({data}) => {
            if (typeof data.code !== 'undefined') {
              this.secretCode = data.code;
              this.code = data.code.split('')
            }
          })
    },
    verify() {
      const data = {'code': this.code.join('')}
      this.axios.post('/account/cabinet/verification/phone/verify', data)
          .then(({data}) => {
            this.$notify(data.message);
            this.$router.push('/cabinet/verification/email')
          })
    },
  }
}
</script>

