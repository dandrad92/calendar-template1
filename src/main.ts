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
          uri: 'https://g2uy7oikqnbuvcnabszu6n3t3a.appsync-api.us-east-1.amazonaws.com/graphql', // Reemplaza con tu endpoint de AppSync
          headers: new HttpHeaders().set('x-api-key', 'da2-shz5i5z5arfajpkg4rtbff3dry'), // Reemplaza con tu API key de AppSync
        }),
      }),
      deps: [HttpLink],
    }, provideAnimationsAsync(),
  ],
});
