<template>
  <section class="wrapper">
    <div>twitter user id: {{ user.id }}</div>
    <p>{{ user }}</p>
    <div>error: {{ error }}</div>
    <a v-bind:href="this.logoutUrl">logout</a>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: {},
      error: null,
      logoutUrl: process.env.baseUrl + "/server/logout",
      callbackUrl: process.env.baseUrl + "/server/auth/twitter/callback"
    };
  },
  mounted() {
    console.log(this.callbackUrl)
    axios.get(this.callbackUrl, {
      params: this.$route.query,
    }).then(res => {
      this.user = res.data.user;
      console.log(this.user);
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
