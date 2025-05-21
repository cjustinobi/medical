import type { GraphqlClient } from 'nuxt-graphql-client'

declare module '#app' {
  interface NuxtApp {
    $graphql: Record<string, GraphqlClient>
  }
}

export {}
