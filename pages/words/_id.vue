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
            id: null,
            word: null
        }
    },

    methods: {
        async getWord() {
            const id = this.$route.params.id
            const response = await axios.get("http://localhost:8080/api/v1/words/" + id)
            this.word = response.data
        }
    },

    async head() {
        await this.getWord()
        console.log(this.word.background_image_url)
        return {
            meta: [
                { hid: 'card', name: 'twitter:card', content: "summary_large_image"},
                { hid: 'site', name: 'twitter:site', content: "@shiki_developer"},
                { hid: 'title', name: 'twitter:title', content: "山の名言"},
                { hid: 'description', name: 'twitter:description', content: "他の名言を見る"},
                { hid: 'image', name: 'twitter:image', content: "https://yamabluesky.files.wordpress.com/2019/01/slide01-2.jpg"}
            ]
        }
    }

    // async head () {
    //     const id = this.$route.params.id
    //     const response = await axios.get("http://localhost:8080/api/v1/words/" + id)
    //     this.word = response.data

    //     return {
    //         meta: [
    //             { hid: 'card', name: 'twitter:card', content: "summary_large_image"},
    //             { hid: 'site', name: 'twitter:site', content: "@shiki_developer"},
    //             { hid: 'title', name: 'twitter:title', content: "山の名言"},
    //             { hid: 'description', name: 'twitter:description', content: "他の名言を見る"},
    //             { hid: 'image', name: 'twitter:image', content: this.word.background_image_url}
    //         ]
    //     }
    // }
}
</script>

<style>

</style>
