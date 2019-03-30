<template>
    <div>
        
        {{ word.background_image_url }}
        {{ word.text }}
        {{ word.user_image_url }}
        {{ word.user_name }}
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
