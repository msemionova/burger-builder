import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './Modal.css';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  render() {
    const style = {
      transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
      opacity: this.props.show ? '1' : '0'
    };

    return (
      <Auxiliary>
        <div className={classes.Modal} style={style}>
          {this.props.children}
        </div>
        <Backdrop show={this.props.show} style={style} clicked={this.props.modalClosed}/>
      </Auxiliary>
    )
  }
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  modalClosed: PropTypes.func.isRequired
}

export default Modal;
