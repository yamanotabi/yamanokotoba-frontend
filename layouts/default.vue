<template>
  <v-app id="inspire">
    <div class="header">
      <div class="display">
        <div class="user_info" v-if="$store.state.user">
          <h4 class="displayName">{{$store.state.user.displayName}}</h4>
          <v-img
            class="elevation-6"
            v-bind:src=$store.state.user._json.profile_image_url_https
          ></v-img>
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
            <v-list-tile @click="handleClick" v-bind:to="this.homeUrl">
              <v-list-tile-content>HOME</v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-if="$store.state.user" @click="handleClick" v-bind:href="this.logoutUrl">
              <v-list-tile-content>LOGOUT</v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-else @click="handleClick" v-bind:href="this.loginUrl">
              <v-list-tile-content>LOGIN / SIGN UP</v-list-tile-content>
            </v-list-tile>
            <v-list-tile @click="handleClick" v-bind:to="this.aboutUrl">
              <v-list-tile-content>ABOUT</v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-navigation-drawer>
      </v-layout>
      <h1 class="app_title">山のことば</h1>
      <h2 class="subtitle">- 山のつぶやきを写真とともに -</h2>
    </div>
    <link href='https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons' rel="stylesheet">
    <nuxt/>
    <div class="footer">
      @2019 <a v-bind:href="this.ownerAccount.url" style="color: black">{{ this.ownerAccount.name }}</a> All Rights Reserved.
    </div>

  </v-app>
</template>

<script>
  import 'vuetify/dist/vuetify.min.css'

  export default {
    data () {
      return {
        showModal: false,
        drawer: null,
        logoutUrl: process.env.baseURL + "/server/logout",
        loginUrl: process.env.baseURL + "/server/auth/twitter",
        homeUrl: "/",
        aboutUrl: "/about",
        ownerAccount: {
          url: process.env.ownerAccountUrl,
          name: process.env.ownerAccountName 
        }
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
  /* font-size: 16px; */
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

.displayName {
  display: inline-block;
  vertical-align: middle;
  color: #35495e;
  padding: 10px;
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
  text-align: center;
}

.subtitle {
  font-weight: 300;
  font-size: 18px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
  text-align: center;
}

.display {
  margin-top: 3%;  
  margin-left: auto;
  width: 210px;
}

.menu_icon {
  margin-left: 5%;
  margin-top: 2%;
}

.elevation-6 {
  display: inline-block !important;
  vertical-align: middle;
  margin-right: 6px;
  border-radius: 40px;
  width: 40px;
}

.text-xs-center {
    text-align: center !important;
    display: inline-block;
    vertical-align: middle;  
}

.theme--light.v-input:not(.v-input--is-disabled) input, .theme--light.v-input:not(.v-input--is-disabled) textarea {
  color: white !important;
  line-height: 28px;
}
</style>
