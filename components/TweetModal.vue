<template>
    <transition name="modal" appear>
        <div class="modal modal-overlay" @click.self="$emit('close')">
            <div class="modal-window">
                <v-layout>
                    <div class="modal-content" :style="{ backgroundImage: 'url(' + imageObject + ')'}">
                        <div class="form-area">
                            <v-textarea class="headline font-weight-bold" color="white" label="山のつぶやき" v-model="text" ></v-textarea>
                        </div>
                        <div class="tweet-button">
                            <v-btn round color="blue-grey" class="white--text" @click="tweet">山のツイート</v-btn>
                        </div>
                        <div class="input-file">
                            <input type="file" @change="onFileChange">
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
            imageObject: null
        }
    },
    mounted() {
        // TODO: get from S3
        const defaultImageUrl = "https://yamabluesky.files.wordpress.com/2019/03/top-background-image-min-min-min.jpg"
        this.imageObject = defaultImageUrl
        this.defaultImageUrl = defaultImageUrl
    },

    props: {
      user: Object
    },
    methods: {
        // upload image
        uploadImage() {
            return axios.get(process.env.baseURL + '/server/upload', {
            params: {
                filename: this.imageObject.name,
                filetype: this.imageObject.type
            }
            }).then(res => {
            const options = {
                headers: {
                'Content-Type': this.imageObject.type
                }
            };
            return axios.put(res.data.url, this.imageObject, options);
            }).then(res => {
                const {name} = res.config.data;
                return {
                    name,
                    isUploading: true,
                    url: `https://yamagen-develop.s3.amazonaws.com/${this.imageObject.name}`
                };
            });
        },

        // tweet
        async tweet() {
            if (this.imageObject != this.defaultImageUrl) {
                const res = await this.uploadImage()
                console.log(this.uploadImage())
            } else {
            const config = {
                headers: { 'content-type': 'application/json' }
            }
            const newTweet = {
                "access_token": this.user.access_token,
                "access_token_secret": this.user.token_secret,
                "background_image_url": this.imageObject,
                "text": this.text,
                "user_image_url": this.user._json.profile_image_url,
                "user_name": this.user.displayName
            }
            // const response = await axios.post("http://localhost:8080/api/v1/words", newTweet, config)
            }
            this.$emit('close')
        },

        // file select
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            this.createImage(files[0]);
        },
        createImage(file) {
            var imageObject = new Image();
            var reader = new FileReader();
            var vm = this;

            reader.onload = (e) => {
                vm.imageObject = e.target.result;
            };
            this.imageObject = file;
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

.form-area {
    width: 500px;
    height: auto;
    margin-left: auto;
    margin-right: auto;    
    margin-top: 100px;
}

.tweet-button {
    margin-top: 50px;
    margin-left: 7%;
}

.input-file {
    margin-left: 8%;
}
</style>
