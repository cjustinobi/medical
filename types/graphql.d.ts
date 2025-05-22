// types/graphql.d.ts
// import type { getSdk as defaultGqlSdk } from '#gql/default'

declare module '#gql' {
//   type GqlClients = 'default'
  // type GqlOps = 'LoginUser' | 'GetInvestigations'
  
// interface GqlSdkFuncs extends ReturnType<typeof defaultGqlSdk> {
//   LoginUser: (variables: { 
//     email: string; 
//     password: string 
//   }) => Promise<{
//     login?: string
//   }>
// }

  // export const GqlLoginUser: GqlSdkFuncs['LoginUser']
  export const GqlGetInvestigations: GqlSdkFuncs['GetInvestigations']
}