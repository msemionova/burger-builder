import React from 'react';
import PropTypes from 'prop-types';
import classes from './ToolbarToggle.css';

const ToolbarToggle = (props) => (
  <div className={classes.ToolbarToggle} onClick={props.clicked}>
    <div></div>
    <div></div>
    <div></div>
  </div>
)

ToolbarToggle.propTypes = {
  clicked: PropTypes.func.isRequired
}

export default ToolbarToggle;
