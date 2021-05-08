import React from 'react';
import PropTypes from 'prop-types';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import ToolbarToggle from './ToolbarToggle/ToolbarToggle';


const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuthenticated={props.isAuthenticated}/>
    </nav>
    <ToolbarToggle clicked={props.menuOpened}/>
  </header>
);

toolbar.propTypes = {
  menuOpened: PropTypes.func.isRequired
}

export default toolbar;
