import React from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: process.env.STRAPI_GRAPHQL_API,
  cache: new InMemoryCache(),
});
