import { PropsWithChildren } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as Provider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { enqueueSnackbar } from "notistack";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>{
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
      enqueueSnackbar(message, { variant: 'error' })
      }
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = setContext((_: any, { headers }: any) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      token: token ?? undefined,
    },
  };
});

const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  credentials: "include",
});

function ApolloProvider({ children }: PropsWithChildren) {
  return <Provider client={client}>{children}</Provider>;
}

export default ApolloProvider;
