<template>
    <div>
        <v-container grid-list-xl align-center>
            <div class="main">
                <v-card
                    class="mx-auto"
                >
                    <v-img class="word_image" v-bind:src="$store.state.word.word.background_image_url">
                    <v-card-title>
                        <v-icon
                        large
                        left
                        >
                        mdi-twitter
                        </v-icon>
                    </v-card-title>
                    <v-card-actions>
                        <v-list-tile class="grow">
                        <a v-bind:href="$store.state.word.tweet_text" onClick="window.open(encodeURI(decodeURI(this.href)), 'tweetwindow', 'width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1'); return false;" rel="nofollow" class="twitter-link">
                            <div class="tweet_button">
                            <img class="tweet_icon" src="../../assets/Twitter_Social_Icon_Circle_White.png" style="width: 40px;" />
                            <h3 class="tweet_text">twitterに投稿</h3>
                            </div>
                        </a>
                        <v-list-tile-content>
                        </v-list-tile-content>
                        <v-layout
                            align-center
                            justify-end
                        >
                        </v-layout>
                        </v-list-tile>
                    </v-card-actions>
                    </v-img>
                </v-card>
                <div class="home_link">
                    <router-link to="/" style="color: #526488;">全てのカードを見る</router-link>
                </div>
            </div>
        </v-container>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            word: null
        }
    },

    async fetch ({ store, params }) {
        const response  = await axios.get(process.env.baseURL + "/server/words/" + params.wordId)
        store.commit('setWord', response.data)
    },

    head () {
        return {
            meta: [
                { hid: 'card', name: 'twitter:card', content: "summary_large_image" },
                { hid: 'site', name: 'twitter:site', content: `${this.$store.state.word.word.user_name}` },
                { hid: 'title', name: 'twitter:title', content: "ヤマノコトバ | 山のつぶやきを1枚の写真とともに"},
                { hid: 'description', name: 'twitter:description', content: "他のカードを全て見る" },
                { hid: 'image', name: 'twitter:image', content: `${this.$store.state.word.word.background_image_url}` }
            ]
        }
    }
}
</script>

<style>
.v-card__actions {
  position: absolute;
  bottom: 0;
}

.headline.font-weight-bold {
  padding: 6px;
}

.tweet_icon {
  display: inline-block;
  vertical-align: middle;
}

.tweet_text {
  margin-left: 8px;
  display: inline-block;
  vertical-align: middle;
}

a {
  color: white;
  text-decoration:none;
}

.theme--light.v-card {
  margin-bottom: 90px;
  max-width: 600;
  width: 600px;
  border-radius: 20px;
}

.user_name {
  color: white;
}

.home_link {
  text-align: center;
  font-size: 16px;
}
</style>
