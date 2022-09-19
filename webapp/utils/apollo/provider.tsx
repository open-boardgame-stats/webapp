import React, { PropsWithChildren, useMemo } from "react";
import {
  ApolloClient,
  ApolloProvider as DefaultProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

import result from "../../graphql/introspection-result";
import useAuth from "../auth/useAuth";

const ApolloProvider = ({ children }: PropsWithChildren) => {
  const { authenticated, accessToken } = useAuth();

  const httpLink = useMemo(
    () =>
      new HttpLink({
        uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
      }),
    []
  );

  const authLink = useMemo(
    () =>
      setContext(async () =>
        authenticated && accessToken
          ? {
              headers: {
                Authorization: accessToken,
              },
            }
          : undefined
      ),
    [accessToken, authenticated]
  );

  const errorLink = useMemo(
    () =>
      onError(({ graphQLErrors }) => {
        if (graphQLErrors) {
          graphQLErrors.map(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          );
        }
      }),
    []
  );

  const client = useMemo(
    () =>
      new ApolloClient({
        cache: new InMemoryCache({
          possibleTypes: result.possibleTypes,
        }),
        defaultOptions: {
          watchQuery: {
            errorPolicy: "all",
          },
        },
        link: authLink.concat(errorLink).concat(httpLink),
      }),
    [authLink, errorLink, httpLink]
  );
  return <DefaultProvider client={client}>{children}</DefaultProvider>;
};

export default ApolloProvider;
