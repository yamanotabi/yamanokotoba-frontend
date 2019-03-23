<template>
  <v-app id="inspire">
    <div class="header">
    <div class="auth_button">
      <div v-if="$store.state.user">
        <a v-bind:href="this.logoutUrl" class="button--green">Logout</a>
      </div>
      <div v-else>
        <a v-bind:href="this.loginUrl" class="button--grey">Login</a>
      </div>
    </div>
    <v-layout wrap>
      <v-toolbar-side-icon large class="menu_icon" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
      >
        <v-list class="pt-0" dense>
          <v-list-tile
            v-for="item in items"
            :key="item.title"
            @click="handleClick"
            v-bind:to="item.url"
          >
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
    </v-layout>
    <h1 class="app_title">山の名言</h1>
    </div>
    <nuxt/>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        drawer: null,
        logoutUrl: process.env.baseURL + "/server/logout",
        loginUrl: process.env.baseURL + "/server/auth/twitter",
        items: [
          { title: 'Home', url: '/' },
          { title: 'About', url: '/about' }
        ]
      }
    },
    methods: {
      handleClick() {
        
      }
    }
  }
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.layout.wrap {
  max-height: 110px;
}

.app_title {
  font-weight: 300;
  font-size: 32px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
  text-align: center;
}

.auth_button {
  margin-top: 1%;  
  margin-left: auto;
  width: 150px;
}

.menu_icon {
  margin-left: 5%;
  margin-top: 2%;  
}

.theme--light.v-input:not(.v-input--is-disabled) input, .theme--light.v-input:not(.v-input--is-disabled) textarea {
  color: white;
}
</style>
