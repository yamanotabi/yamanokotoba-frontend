<template>
  <div>
    <v-container
      grid-list-xl
      align-center
    >
      <div class="infinite-scroll">
        <v-layout v-for="(word, index) in words" :key="index">
          <v-card
            class="mx-auto"
          >
            <v-img class="word_image" v-bind:src="word.background_image_url">
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
                  <a v-bind:href="word.tweet_text" onClick="window.open(encodeURI(decodeURI(this.href)), 'tweetwindow', 'width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1'); return false;" rel="nofollow" class="twitter-link">
                    <div class="tweet_button">
                      <img class="tweet_icon" src="../assets/Twitter_Social_Icon_Circle_White.png" style="width: 40px;" />
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
        </v-layout>
      </div>
      <div class="footer">
        @2019 <a v-bind:href="this.ownerAccount.url" style="color: black">{{ this.ownerAccount.name }}</a> All Rights Reserved.
      </div>

      <!-- <div v-if="this.scroll">
        <no-ssr>
          <infinite-loading 
            ref="infiniteLoading" 
            spinner="spiral"
            @infinite="infiniteHandler">
          </infinite-loading>
        </no-ssr>
      </div> -->
      <tweetModal :user="userInfo" v-if="showModal" @close="closeModal"></tweetModal>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import tweetModal from '~/components/TweetModal.vue'

export default {
  components: {
    tweetModal
  },
  name: 'InfiniteScroll',
  data() {
    return {
      showModal: false,
      count: 1,
      words: [],
      userInfo: null,
      ownerAccount: {
        url: process.env.ownerAccountUrl,
        name: process.env.ownerAccountName 
      }
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
  },

  async asyncData() {
    // if (process.client) {
    //   window.addEventListener('scroll', this.handleScroll)
    // }
    const response = await axios.get(process.env.baseURL + "/server/words")
    return { words: response.data.words }
    // this.list = response.data.words
    // for (var i = 0; i < 3; i++) {
    //   this.words.push(response.data.words[i])
    // }
  },
  methods: {
    openModal(user) {
      this.userInfo = user;
        this.showModal = true;
    },
    closeModal() {
        this.showModal = false;
    },
    // handleScroll() {
    //   this.scrollY = window.scrollY
    // },
    // infiniteHandler() {
    //   setTimeout(() => {
    //     const temp = []
    //     if (this.scroll) {
    //       for (let i = this.words.length; i <= this.words.length + 2; i++) {
    //         temp.push(this.list[i])
    //         if (this.list.length == i + 1) {
    //           this.scroll = false;
    //           break;
    //         }
    //       }
    //     }
    //     this.words = this.words.concat(temp)
    //     this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')          
    //   }, 1000)
    // }
  }
}
</script>

<style>
.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 18px !important;
  color: #35495e;
  letter-spacing: 1px;
}

.main {
  margin-bottom: 5%;
  text-align: center;
}

.v-card__actions {
  position: absolute;
  bottom: 0;
}

.headline.font-weight-bold {
  color: white;
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

/* .v-responsive__content {
  background-color: rgba(0,0,0,0.3);
}
 */
.theme--light.v-card {
  margin-bottom: 90px;
  max-width: 600;
  width: 600px;

  border-radius: 20px;
}

.user_name {
  color: white;
}

.footer {
  text-align: center;
  height: 60px;
  padding: 10px 20px 30px 20px;
  position: relative;
  bottom: 0;
}

</style>

