import { gql } from "@apollo/client"

export const GET_USERS = gql`
    query GetUsers {
        users {
            username
            email
        }
    }
`

export const GET_AUTH_USER = gql`
query AuthUser {
  authUser {
    email
    username  
  }
}
`
