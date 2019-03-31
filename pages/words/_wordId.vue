<template>
    <div>
        {{ word }}
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
        const id = params.wordId
        const response  = await axios.get("http://localhost:8080/api/v1/words/" + id)
        const headInfo = {
            "userName": response.data.user_name,
            "backgroundImageUrl": response.data.background_image_url
        }
        store.commit('setHead', headInfo)
    },
    
    // async beforeCreate() {
    //     const id = this.$route.params.wordId
    //     const response = await axios.get("http://localhost:8080/api/v1/words/" + id)
    //     this.word = response.data
    // },

    head () {
        return {
            meta: [
                { hid: 'card', name: 'twitter:card', content: "summary_large_image" },
                { hid: 'site', name: 'twitter:site', content: `${this.$store.state.head.userName}` },
                { hid: 'title', name: 'twitter:title', content: "山の名言"},
                { hid: 'description', name: 'twitter:description', content: "他の名言を見る" },
                { hid: 'image', name: 'twitter:image', content: `${this.$store.state.head.backgroundImageUrl}` }
            ]
        }
    }
}
</script>

<style>

</style>
