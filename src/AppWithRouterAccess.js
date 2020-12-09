import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { OktaAuth } from '@okta/okta-auth-js'
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import Home from './Home';
import Login from './Login';
import Protected from './Protected';


const oktaAuth = new OktaAuth({
  issuer: 'https://dev-414194.okta.com/'
})

export default withRouter(class AppWithRouterAccess extends Component {
  constructor(props) {
    super(props);
    this.onAuthRequired = this.onAuthRequired.bind(this);
  }

  onAuthRequired() {
    this.props.history.push('/login')
  }

  render() {

    // Note: If your app is configured to use the Implicit Flow
    // instead of the Authorization Code with Proof of Code Key Exchange (PKCE)
    // you will need to add the below property to what is passed to <Security>
    //
    // pkce={false}

    return (
        <Security issuer='https://dev-414194.okta.com/oauth2/default'
                  clientId='0oa1jv9z7uCMIuFJS4x7'
                  redirectUri={window.location.origin + '/login/callback'}
                  oktaAuth={oktaAuth}
                  onAuthRequired={this.onAuthRequired} >
          <Route path='/' exact={true} component={Home} />
          <SecureRoute path='/protected' component={Protected} />
          <Route path='/login' render={() => <Login baseUrl='https://dev-414194.okta.com/' />} />
          <Route path='/login/callback' component={LoginCallback} />
        </Security>
    );
  }
});
