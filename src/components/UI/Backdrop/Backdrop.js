import React from 'react';
import PropTypes from 'prop-types';
import classes from './Backdrop.css';

const backdrop = (props) => (
  props.show ? <div onClick={props.clicked} className={classes.Backdrop}></div> : null
);

backdrop.propTypes = {
  show: PropTypes.bool.isRequired,
  clicked: PropTypes.func.isRequired
}

export default backdrop;
