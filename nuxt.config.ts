// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    'nuxt-graphql-client', 
    '@nuxt/eslint',
    'usebootstrap',
  ],
  typescript: {
    typeCheck: true
  },
  'graphql-client': {
    clients: {
      default: {
        host: process.env.GQL_HOST || 'https://testdrive.kompletecare.com/graphql',
        retainToken: true,
        headers: {
          'Authorization': 'Bearer 6219|F3lckk0aSD0BnJ1fo3GRfteRV4GvSeLx6y2oLxWe'
        }
      }
    }
  },
  css: [
    '~/assets/css/main.css'
  ]

})