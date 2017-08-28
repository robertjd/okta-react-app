// src/Protected.js

import React from 'react';
import { withAuth } from './auth';

export default withAuth(props => {
  const token = props.auth.getIdToken();
  return (
    <div>
      <h3>This is a protected view</h3>
      <p>Hello, {token.claims.name}, you are able to see this page because you have authenticated.</p>
      <p>Below, you will see your ID Token from Okta.</p>
      <a href="/">Back to Home</a>
      <hr/>
      <pre>
        {JSON.stringify(token, null, 2) }
      </pre>
    </div>
  )
});