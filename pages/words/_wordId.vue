<template>
    <div>
        {{ $store.state.word }}
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

    // async fetch ({ store, params }) {
    //     const response  = await this.$axios.get("/words/" + params.wordId)
    //     store.commit('setWord', response.data)
    // },

    head () {
        return {
            // title: this.$store.state.word.text,
            meta: [
                { hid: 'card', name: 'twitter:card', content: "summary_large_image" },
                { hid: 'site', name: 'twitter:site', content: "@shiki_developer" },
                { hid: 'title', name: 'twitter:title', content: "山の名言"},
                { hid: 'description', name: 'twitter:description', content: "他の名言を見る" },
                { hid: 'image', name: 'twitter:image', content: "https://s3-ap-northeast-1.amazonaws.com/yamatabi-production/images/test.jpg" }
            ]
        }
    }
}
</script>

<style>

</style>
