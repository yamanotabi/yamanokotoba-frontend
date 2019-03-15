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
      logoutUrl: process.env.baseURL + "/server/logout",
      callbackUrl: process.env.baseURL + "/server/auth/twitter/callback"
    };
  },
  async mounted() {
    axios.get(this.callbackUrl, {
      params: this.$route.query,
    }).then(res => {
      const user = res.data.user
      this.$store.commit('login', user)
      this.$router.push('/home')
    }).catch(err => {
      this.error = err;
    });
  },
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  text-align: center;
}
</style>
