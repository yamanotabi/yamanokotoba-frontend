<template>
  <div>
    <h1>Home</h1>
    <p>{{ $store.state.user }}</p>
    <br>
    <a
      href="/server/logout"
      class="button--green"
    >Logout</a>
  </div>
</template>

<script>
export default {
  fetch({ store, redirect }) {
    // 未認証の場合、リダイレクトする
    if (!store.state.auth) {
      return redirect('/')
    }
  },
  name: 'InfiniteScroll',
  data() {
    return {
      count: 20
    }
  },
  methods: {
    infiniteHandler() {
      setTimeout(() => {
        this.count += 20
        this.$refs.infiniteLoading.stateChanger.loaded()
      }, 1000)
    }
  }  
}
</script>
