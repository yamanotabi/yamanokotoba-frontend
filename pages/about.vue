<template>
  <div>
    <v-container grid-list-xl align-center>
      <v-layout>
      <div class="about">
        <div class="bg-image"></div>
      </div>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  components: {
  },
  data() {
    return {
    }
  }
}
</script>

<style>
.about {
  text-align: center;
  background-color: red;
  width: 600px;
  height: 400px;
  max-width: 600;
  margin: auto;
}

</style>

