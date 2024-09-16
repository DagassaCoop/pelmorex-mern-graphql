import { gql } from "@apollo/client";

export const LOGIN = gql`
    mutation Login($input: LoginInput!) {
        login(input: $input) {
            user {
                _id
                username
            }
            userJwtToken {
                token
            }
        }
    }
`

export const SIGNUP = gql`
mutation SignUp($input: SignUpInput!) {
  signUp(input: $input) {
    user {
      _id
      username
    }  
    userJwtToken {
      token
    }
  }
}
`