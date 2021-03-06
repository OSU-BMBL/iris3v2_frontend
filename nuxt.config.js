export default {
  publicRuntimeConfig: {
    API_URL: process.env.API_URL || 'https://bmbls.bmi.osumc.edu',
  },
  components: true,
  docs: {
    primaryColor: '#30588C',
  },
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  loading: '~/components/utils/Loading.vue',

  mode: 'universal',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    titleTemplate: 'IRIS3',
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }],
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    '~/plugins/notifier.js',
    { src: '~/plugins/plugin.js', mode: 'client' },
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  router: {
    base: '/iris3v2',
    linkActiveClass: 'active-link',
  },
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    '@nuxtjs/dotenv',
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt/content
    '@nuxt/content',
    '@nuxtjs/auth',
    'nuxt-socket-io',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: { baseURL: process.env.API_URL },
  io: {
    // module options
    sockets: [
      {
        name: 'main',
        url: process.env.SOCKET_URL,
        default: true,
        vuex: {
          actions: [{ jobProgress: 'socket/FORMAT_JOB_PROGRESS' }],
        },
      },
    ],
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: process.env.API_URL + 'deepmaps/api/auth/login',
            method: 'post',
            propertyName: 'access_token',
          },
          user: {
            url: process.env.API_URL + 'deepmaps/api/auth/profile',
            method: 'get',
            propertyName: 'email',
          },
          logout: false,
        },
      },
    },
  },
  /*
   ** Content module configuration
   ** See https://content.nuxtjs.org/configuration
   */
  content: {
    liveEdit: false,
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    defaultAssets: {
      font: {
        family: 'Poppins',
      },
    },
    theme: {
      light: true,
      themes: {
        light: {
          primary: '#1565C0', // ?????????, Iris Ensata https://colors.japanesewithanime.com/japanese-colors/%E8%8F%96%E8%92%B2%E8%89%B2-shoubuiro
          secondary: '#752EFF', // https://waaffle.com/
          tertiary: '#BF3111',
          accent: '#5698c3', // ??????
          info: '#2775b6', // ?????????
        },
      },
    },
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    extend(config, { isDev, isClient }) {
      config.node = {
        fs: 'empty',
      }
    },
  },
}
