import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    isMenuOpened: false
  }

  menuHandler = (boolean) => {
    this.setState({isMenuOpened: boolean});
  }

  render() {
    return (
      <Auxiliary>
        <Toolbar isAuthenticated={this.props.isAuthenticated} menuOpened={() => {
            let isMenuOpened = this.state.isMenuOpened;
            this.menuHandler(!isMenuOpened);
          }
        }/>
        <SideDrawer
          isAuthenticated={this.props.isAuthenticated}
          menuClosed={() => this.menuHandler(false)}
          show={this.state.isMenuOpened}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Auxiliary>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
};

export default connect(mapStateToProps)(Layout);
