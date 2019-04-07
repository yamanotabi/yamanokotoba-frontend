<template>
  <section class="wrapper">
  </section>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: {},
      error: null,
      callbackUrl: process.env.baseURL + "/server/auth/twitter/callback"
    };
  },
  async mounted() {
    axios.get(this.callbackUrl, {
      params: this.$route.query,
    }).then(res => {
      const user = res.data.user
      this.$store.commit('login', user)
      this.$router.push('/')
    }).catch(err => {
      this.error = err;
    });
  },
};
</script>
