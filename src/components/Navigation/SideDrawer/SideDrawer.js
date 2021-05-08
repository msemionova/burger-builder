import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';


const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.show) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <Auxiliary>
      <div className={attachedClasses.join(' ')} onClick={props.menuClosed}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuthenticated}/>
        </nav>
      </div>
      <Backdrop show={props.show} clicked={props.menuClosed}/>
    </Auxiliary>
  );
};

sideDrawer.propTypes = {
  menuClosed: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
}

export default sideDrawer;
