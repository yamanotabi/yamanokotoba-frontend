<template>
  <div>
    <v-container>
      <div class="about">
        <p>「そこに山があるから。」</p>
        <br>
        <p>山屋は誰もが哲学者</p>
        <p>登山中に感じたこと、山に対する熱い想いや山あるあるなど、テキストだけでは伝わらない！！</p>
        <p>そんなあなただけの名言をこのサイトではそんな言葉を写真と一緒につぶやくことができます。</p>
      </div>
      <div class="how_to_use">
        <h2>使い方</h2>
        <p>1. 投稿ボタン  <img class="button_img" src="../assets/button_img.png" />  からカードを作成する。</p>
        <p>2. 作成したカードはカードの左下の「twitterに投稿」でTwitterにシェアできます。</p>
        <img class="sample_img" src="../assets/how_to_use.png" />
        <p>※他の人が作成したカードもtiwtterにシェアすることができます。好きな言葉があればどんどんシェアしよう！</p>
      </div>
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
        { name: 'twitter:title', content: "ヤマノコトバ"},
        { name: 'twitter:description', content: "他のカードを全て見る" },
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
  margin: auto;
  font-size: 16px;
}

.how_to_use {
  margin-top: 30px;
  font-size: 16px;
  text-align: center;
}

.button_img {
  border-radius: 42px;
  width:30px;
  vertical-align: middle;
}

.sample_img {
  width:300px;
  height: 200px;
}

</style>

