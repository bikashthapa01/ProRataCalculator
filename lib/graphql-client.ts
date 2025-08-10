import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

// WordPress CMS domain for GraphQL API
const WORDPRESS_CMS_URL = "https://cms.proratacalculator.co.uk";
const GRAPHQL_ENDPOINT = `${WORDPRESS_CMS_URL}/graphql`;

const httpLink = createHttpLink({
  uri: GRAPHQL_ENDPOINT,
  credentials: "omit", // No cookies needed for public API
  fetchOptions: {
    timeout: 10000, // 10 second timeout
  },
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      Post: {
        keyFields: ["slug"], // Use slug as unique identifier
      },
      Category: {
        keyFields: ["slug"],
      },
      Tag: {
        keyFields: ["slug"],
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
      errorPolicy: "all",
    },
    query: {
      errorPolicy: "all",
    },
  },
});

// Export the WordPress CMS URL for other uses
export const WORDPRESS_URL = WORDPRESS_CMS_URL;
