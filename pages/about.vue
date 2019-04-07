<template>
  <div>
    <v-container grid-list-xl align-center>
      <v-layout>
      <div class="about">
        <div class="bg-image"></div>
      </div>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  components: {
  },
  data() {
    return {
    }
  },

  head() {
    return {
      title: '山のことば | 山のつぶやきを写真とともに',
      meta: [
        { name: 'twitter:card', content: "summary_large_image" },
        { name: 'twitter:site', content: "@shiki_developer" },
        { name: 'twitter:title', content: "山の名言"},
        { name: 'twitter:description', content: "他の名言を見る" },
        { name: 'twitter:image', content: "https://s3-ap-northeast-1.amazonaws.com/yamatabi-production/site/site.jpg" }
      ]
    }
  }  
}
</script>

<style>
.about {
  text-align: center;
  background-color: red;
  width: 600px;
  height: 400px;
  max-width: 600;
  margin: auto;
}

</style>

