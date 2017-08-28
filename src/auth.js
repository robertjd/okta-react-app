// src/auth.js

import React from 'react';
import OktaAuth from '@okta/okta-auth-js';

class Auth {
  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.redirect = this.redirect.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.getIdToken = this.getIdToken.bind(this);

    this.oktaAuth = new OktaAuth({
      url: 'https://dev-431502.oktapreview.com',
      clientId: '0oabnwhohxG2Yw5w80h7',
      issuer: 'https://dev-431502.oktapreview.com/oauth2/default',
      redirectUri: 'http://localhost:3000/implicit/callback',
    });
  }

  login(history) {
    // Redirect to the login page
    history.push('/login');
  }

  async logout(history) {
    this.oktaAuth.tokenManager.clear();
    await this.oktaAuth.signOut();
    history.push('/');
  }

  redirect() {
    // Launches the login redirect.
    this.oktaAuth.token.getWithRedirect({
      responseType: ['id_token', 'token'],
      scopes: ['openid', 'email', 'profile']
    });
  }

  getIdToken() {
    return this.oktaAuth.tokenManager.get('idToken');
  }

  isAuthenticated() {
    // Checks if there is a current accessToken in the TokenManger.
    return !!this.oktaAuth.tokenManager.get('accessToken');
  }

  async handleAuthentication() {
    const tokens = await this.oktaAuth.token.parseFromUrl();
    for (let token of tokens) {
      if (token.idToken) {
        this.oktaAuth.tokenManager.add('idToken', token);
      } else if (token.accessToken) {
        this.oktaAuth.tokenManager.add('accessToken', token);
      }
    }
  }
}

// create a singleton
const auth = new Auth();
export const withAuth = WrappedComponent => props =>
  <WrappedComponent auth={auth} {...props} />;