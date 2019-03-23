require('dotenv').config();
const { TWITTER_API_KEY } = process.env.TWITTER_API_KEY
const { TWITTER_API_SECRET_KEY } = process.env.TWITTER_API_SECRET_KEY
const { AWS_API_KEY } = process.env.AWS_API_KEY
const { AWS_SECRET_KEY } = process.env.AWS_SECRET_KEY

module.exports = {
  /*
  ** Headers of the page
  */
  modules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/axios'
  ],

  router: {
    middleware: 'session'
  },

  plugins: [
    { src: '~/plugins/infiniteloading', ssr: true },
    { src: '~/plugins/axios', ssr: true },
  ],

  vuetify: {
    theme: {
      primary: '#3f51b5',
      secondary: '#b0bec5',
      accent: '#8c9eff',
      error: '#b71c1c'
    }
  },

  head: {
    title: '山の名言',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  env: {
    TWITTER_API_KEY,
    TWITTER_API_SECRET_KEY,
    AWS_API_KEY,
    AWS_SECRET_KEY,
    baseURL: process.env.BASE_URL || 'http://127.0.0.1:3000',
    callbackURL: process.env.CALLBACK_URL || 'http://127.0.0.1:3000/callback'
  },
  serverMiddleware: ['~/server'],
}

