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

    async fetch ({ store, params }) {
        const response  = await this.$axios.get("/words/" + params.wordId)
        console.log(response.data)
        store.commit('setWord', response.data)
    },

    head () {
        return {
            title: this.$store.state.word.text,
            meta: [
                { hid: 'card', name: 'twitter:card', content: "summary_large_image" },
                { hid: 'site', name: 'twitter:site', content: `${this.$store.state.word.user_name}` },
                { hid: 'title', name: 'twitter:title', content: "山の名言"},
                { hid: 'description', name: 'twitter:description', content: "他の名言を見る" },
                { hid: 'image', name: 'twitter:image', content: `${this.$store.state.word.background_image_url}` }
            ]
        }
    }
}
</script>

<style>

</style>
