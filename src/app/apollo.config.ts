import { HttpLink } from 'apollo-angular/http';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const http = httpLink.create({ uri: 'https://g2uy7oikqnbuvcnabszu6n3t3a.appsync-api.us-east-1.amazonaws.com/graphql' });

  const auth = setContext((operation, context) => ({
    headers: {
      'x-api-key': 'da2-shz5i5z5arfajpkg4rtbff3dry'
    }
  }));

  return {
    link: auth.concat(http),
    cache: new InMemoryCache(),
  };
}
