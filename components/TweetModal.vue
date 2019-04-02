<template>
    <transition name="modal" appear>
        <div class="modal modal-overlay" @click.self="$emit('close')">
            <div class="modal-window">
                <v-layout>
                    <div class="modal-content" :style="{ backgroundImage: 'url(' + imageObject + ')'}">
                        <div class="form-area">
                            <v-textarea class="headline font-weight-bold" color="white" label="山のつぶやき" v-model="text" ></v-textarea>
                        </div>
                        <p class ="error-message" v-if="message != null">{{ message }}</p>

                        <div class="tweet-button">
                            <v-btn round color="blue-grey" class="white--text" @click="tweet">山のツイート</v-btn>
                        </div>
                        <div class="input-file">
                            <label for="file_photo">
                                <input type="file" @change="onFileChange" style="display:none;" id="file_photo">
                            </label>
                        </div>
                    </div>
                </v-layout>
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
            id: '0',
            text: null,
            defaultImageUrl: null,
            imageObject: null,
            uploadTarget: null,
            imageUrl: null,
            message: null
        }
    },
    mounted() {
        // TODO: get from S3
        const defaultImageUrl = "https://yamabluesky.files.wordpress.com/2019/03/top-background-image-min-min-min.jpg"
        this.defaultImageUrl = defaultImageUrl
        this.imageObject = defaultImageUrl
    },

    props: {
      user: Object
    },
    methods: {
        // tweet
        async tweet() {
            const config = {
                headers: { 'content-type': 'application/json' }
            }
            var params = new FormData()
            params.append('file', this.uploadTarget)
            params.append("access_token", this.user.access_token)
            params.append('access_token_secret', this.user.token_secret)
            params.append('text', this.text)
            params.append('user_image_url', this.user._json.profile_image_url)
            params.append('user_name', this.user.displayName)

            const response = await axios.post(process.env.yamagenApiBaseURL + "/api/v1/words", params, config)
            this.$emit('close')
        },

        // file select
        async onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            
            if (files[0].size > 3000000) {
                this.message = "アップロードできる写真の上限は3MBです。"
                return;
            }

            this.uploadTarget = files[0]
            this.createImage(files[0]);
        },
        createImage(file) {
            if (this.message != null) {
                this.message = null
            }
            var imageObject = new Image();
            var reader = new FileReader();
            var vm = this;

            reader.onload = (e) => {
                vm.imageObject = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        removeImage: function (e) {
            this.imageObject = '';
        }
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
    border-radius: 20px;
    overflow: hidden;
    margin auto;
  }

  &-content {
    position: relative;
    width: 600px;
    height 400px;
    background-position:center top;
    background-repeat:no-repeat;
    -moz-background-size:cover;
    background-size:cover;
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

.error-message {
    color: red;
    margin-left: 7%;
}

.form-area {
    width: 500px;
    height: auto;
    margin-left: auto;
    margin-right: auto;    
    margin-top: 100px;
}

.tweet-button {
    display: inline-block;
    vertical-align: middle;
    margin-left: 7%;
    margin-top: 5px;
}

.input-file {
    width:100px;
    vertical-align: middle;
    display: inline-block;
    margin-top: 5px;
}

.theme--light.v-input:not(.v-input--is-disabled) input, .theme--light.v-input:not(.v-input--is-disabled) textarea {
    color: white;
}

label {
    display: block;
    float:left;
    width: 32px;
    height: 32px;
    background-image: url("../assets/icon-camera.png")
    border-radius: 6px;
    background-repeat:no-repeat;
    background-size:cover;
}
</style>
