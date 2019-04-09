<template>
  <div>
    <v-container grid-list-xl align-center>
      <v-layout>
      <div class="about">
        <p>「そこに山があるから。」</p>
        <br>
        <p>山屋は誰もが哲学者</p>
        <p>登山中に感じたこと、山に対する熱い想いや山あるあるなど、テキストだけでは伝わらない！！</p>
        <p>そんなあなただけの名言をこのサイトではそんな言葉を写真と一緒につぶやくことができます。</p>
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
  padding: 15px;
  font-size: 18px;
}

</style>

