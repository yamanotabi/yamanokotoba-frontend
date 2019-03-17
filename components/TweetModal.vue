<template>
    <transition name="modal" appear>
        <div class="modal modal-overlay" @click.self="$emit('close')">
            
                
                    <div class="modal-window">
                        <v-container grid-list-xl align-center>
                            <v-layout>
                        <div class="modal-content">
                            <v-textarea  box auto-grow label="山のつぶやき" v-model="text" placeholder="Yama tweet" class="text-area"></v-textarea>
                            <div class="tweet-image">
                                <p class="text" style="white-space: pre-line;">{{ text }}</p>
                            </div>
                        <div class="tweet-button">
                            <v-btn round color="blue-grey" class="white--text" @click="tweet">山のツイート</v-btn>
                        </div>
                        </div>
                            </v-layout>
                        </v-container>
</div>
                
            
        </div>
    </transition>
</template>

<script>
import axios from 'axios'

export default {
    name: 'TweetModal',
    data() {
        return {
            text: null
        }
    },
    props: {
      user: Object
    },
    methods: {
        async tweet() {
            const config = {
                headers: { 'content-type': 'application/json' }
            }
            const newTweet = {
                "access_token": this.user.access_token,
                "access_token_secret": this.user.token_secret,
                "background_image_url": "https://yamabluesky.files.wordpress.com/2019/01/pexels-photo-94258-1.jpg",
                "text": this.text,
                "user_image_url": this.user._json.profile_image_url,
                "user_name": this.user.displayName
            }
            const response = await axios.post("http://localhost:8080/api/v1/words", newTweet, config)
            this.$emit('close')
        },
    }
}
</script>

<style lang="stylus" scoped>
.modal {
  &.modal-overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }

  &-window {
    background: #fff;
    border-radius: 4px;
    overflow: hidden;
    margin auto;
  }

  &-content {
    position: relative;
    width: 600px;
    height 500px;
  }

  &-footer {
    background: #ccc;
    padding: 10px;
    text-align: right;
  }
}

// オーバーレイのトランジション
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.4s;

  // オーバーレイに包含されているモーダルウィンドウのトランジション
  .modal-window {
    transition: opacity 0.4s, transform 0.4s;
  }
}

// ディレイを付けるとモーダルウィンドウが消えた後にオーバーレイが消える
.modal-leave-active {
  transition: opacity 0.6s ease 0.4s;
}

.modal-enter, .modal-leave-to {
  opacity: 0;

  .modal-window {
    opacity: 0;
    transform: translateY(-20px);
  }
}


.tweet-button {
    margin-left: auto;
    margin-top: 280px;
    width: 140px;
}

.tweet-image {
    background-color: #f00;
    border-radius: 20px;
    width: 90%;
    height: 57%;
    top: 108px;
    bottom: 0;
    left: 0;
    right: 0;
    position: absolute;
    margin: auto;
}
</style>
