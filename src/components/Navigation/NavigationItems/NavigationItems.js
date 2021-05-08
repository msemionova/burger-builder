import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/burger-builder">Burger Builder</NavigationItem>
      {props.isAuthenticated ? <NavigationItem link="/orders">My Orders</NavigationItem> : null}
      {props.isAuthenticated
        ? <NavigationItem link="/logout">Logout</NavigationItem>
        : <NavigationItem link="/auth">Authenticate</NavigationItem>}
    </ul>
  );
};

export default navigationItems;
