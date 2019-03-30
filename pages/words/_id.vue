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

    head () {
        return {
            meta: [
                { hid: 'card', name: 'twitter:card', content: "summary_large_image"},
                { hid: 'site', name: 'twitter:site', content: this.word.user_name},
                { hid: 'title', name: 'twitter:title', content: "山の名言"},
                { hid: 'description', name: 'twitter:description', content: "他の名言を見る"},
                { hid: 'image', name: 'twitter:image', content: this.word.background_image_url}
            ]
        }
    },

    async mounted() {
        const id = this.$route.params.id
        const response = await axios.get("http://localhost:8080/api/v1/words/" + id)
        this.word = response.data
        console.log(this.word)
    }
}
</script>

<style>

</style>
