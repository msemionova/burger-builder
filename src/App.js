import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter} from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount() {
    this.props.onCheckAuthState();
  }

  render () {
    let routes = (
      <Switch>
        <Redirect exact from="/" to="/burger-builder" />
        <Route exact path="/burger-builder" component={BurgerBuilder}/>
        <Route path="/auth" component={Auth}/>
        <Redirect to='/' />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Redirect exact from="/" to="/burger-builder" />
          <Route exact path="/burger-builder" component={BurgerBuilder}/>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/orders" component={Orders}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/auth" component={Auth}/>
          <Redirect to='/' />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          <Switch>
            {routes}
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuthState: () => dispatch(actions.checkAuthState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));