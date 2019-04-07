require('dotenv').config();
const { TWITTER_API_KEY } = process.env.TWITTER_API_KEY
const { TWITTER_API_SECRET_KEY } = process.env.TWITTER_API_SECRET_KEY
const { AWS_API_KEY } = process.env.AWS_API_KEY
const { AWS_SECRET_KEY } = process.env.AWS_SECRET_KEY

module.exports = {
  /*
  ** Headers of the page
  */
 head: {
  title: '山のことば | 山に関するつぶやきを1枚の写真とともに',
  titleTemplate: '%s | 山のことば',
  meta: [
    { charset: 'utf-8' },
    { hid: 'card', name: 'twitter:card', content: "summary_large_image" },
    { hid: 'site', name: 'twitter:site', content: "@shiki_developer" },
    { hid: 'image', name: 'twitter:image', content: "https://yamabluesky.files.wordpress.com/2019/03/top-background-image-min-min-min.jpg" }
  ]
 },

  modules: [
    '@nuxtjs/axios'
  ],

  router: {
    middleware: 'session'
  },

  plugins: [
    '~plugins/vuetify.js',
    { src: '~/plugins/infiniteloading', ssr: true },
    { src: '~/plugins/axios', ssr: true },
  ],

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
    callbackURL: process.env.CALLBACK_URL || 'http://127.0.0.1:3000/callback',
    yamagenApiBaseURL: process.env.YAMAGEN_API_URL || 'http://127.0.0.1:8080'
  },
  serverMiddleware: ['~/server'],
}

