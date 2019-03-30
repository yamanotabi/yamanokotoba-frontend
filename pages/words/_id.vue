<template>
    <div>
        
        {{ word }}
        <!-- <v-layout>
        <v-card
        class="mx-auto"
        >
            <v-img class="word_image" :src="word.background_image_url">
                <v-card-title>
                <v-icon
                    large
                    left
                >
                    mdi-twitter
                </v-icon>
                </v-card-title>
                <v-card-text class="headline font-weight-bold">
                {{ word.text }}
                </v-card-text>
                <v-card-actions>
                <v-list-tile class="grow">
                    <v-list-tile-avatar color="grey darken-3">
                    <v-img
                        class="elevation-6"
                        v-bind:src="word.user_image_url"
                    ></v-img>
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                    <v-list-tile-title class="user_name">{{ word.user_name }}</v-list-tile-title>
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
        </v-layout> -->
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
                { hid: 'description', name: 'twitter:card', content: "summary_large_image"},
                { hid: 'description', name: 'twitter:site', content: "@shiki_developer"},
                { hid: 'description', name: 'twitter:title', content: "海の写真"},
                { hid: 'description', name: 'twitter:description', content: "海がきれいな写真です。"},
                { hid: 'description', name: 'twitter:image', content: "http://cly7796.net/wp/sample/determine-the-type-of-twitter-card/img2.jpg"}
            ]
        }
    },

// <meta name="twitter:card" content="summary_large_image" />
// <meta name="twitter:site" content="@cly7796net" />
// <meta name="twitter:title" content="海の写真" />
// <meta name="twitter:description" content="海がきれいな写真です。" />
// <meta name="twitter:image" content="http://cly7796.net/wp/sample/determine-the-type-of-twitter-card/img2.jpg" />


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
