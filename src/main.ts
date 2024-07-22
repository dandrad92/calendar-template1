import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, HttpClientModule, ApolloModule),
    provideHttpClient(),
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => ({
        cache: new InMemoryCache(),
        link: httpLink.create({
          uri: 'https://7fyzygnotjasbcqphqftdk55nm.appsync-api.us-east-2.amazonaws.com/graphql', // Reemplaza con tu endpoint de AppSync
          headers: new HttpHeaders().set('x-api-key', 'da2-dfs7be65kjellg7em3dkavgc4a'), // Reemplaza con tu API key de AppSync
        }),
      }),
      deps: [HttpLink],
    }, provideAnimationsAsync(),
  ],
});
