import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  ApolloProvider as Provider,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { ReactNode } from "react";

const createApolloClient = () => {  
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_INTERNAL_GRAPHQL_URL,
    // A custom fetch handler adds the logged in user's access token to GraphQL requests
    fetch: async (uri, options) => {
      if (!options || !options.headers) options = { ...(options || {}), headers: {}};
      const headers = options.headers as { [key: string]: string };
      headers["x-api-key"] = process.env.NEXT_PUBLIC_GRAPHQL_API_KEY!;

      return fetch(uri, { ...options, headers });
    },
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  });

  const cache = new InMemoryCache();
  const link = ApolloLink.from([errorLink, httpLink]);

  return new ApolloClient({ link, cache });
};

export default function ApolloProvider({ children }: { children: ReactNode }) {
  const client = createApolloClient();
  return <Provider client={client}>{children}</Provider>;
}