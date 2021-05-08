import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { updateObject, checkValidity } from '../../shared/utility';
import * as actions from '../../store/actions/index';
import classes from './Auth.css';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email address'
        },
        value: '',
        validation: {
          isEmail: true,
          required: true,
          valid: false,
          touched: false
        }
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          valid: false,
          touched: false,
          minLength: 8
        }
      }
    },
    isSignup: true
  }

  componentDidMount = () => {
    if (!this.props.isPurchasing) {
      this.props.onSetAuthRedirectPath();
    }
  };

  submitHandler = (event) => {
    event.preventDefault();
    const authMethod = this.state.isSignup ? 'signUp' : 'signIn';
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, authMethod);
  };

  inputChangedHandler = (event, controlName) => {
    event.preventDefault();
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        validation: updateObject(this.state.controls[controlName].validation, {
          valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
          touched: true
        })
      })
    });
    this.setState({controls: updatedControls});
  };

  switchAuthModeHandler = (event) => {
    event.preventDefault();
    this.setState(prevState => {
      return {
        isSignup: !prevState.isSignup
      }
    });
  };

  render() {
    const authRedirect = this.props.isAuthenticated ? <Redirect to={this.props.authRedirectPath} /> : null;
    let form = <Spinner />;
    let errorMessage = null;

    if (this.props.error) {
      errorMessage = <p className={classes.ErrorMessage}>{this.props.error.message.replace('_', ' ').toLowerCase()}</p>
    }

    if (!this.props.loading) {
      const formElementsArray = [];
      for (let key in this.state.controls) {
        formElementsArray.push({
          id: key,
          config: this.state.controls[key]
        })
      }
      form = (
        <form onSubmit={this.submitHandler}>
          {formElementsArray.map(formElement => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.validation.valid}
              changed={(event) => this.inputChangedHandler(event, formElement.id)}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.validation.touched}
            />
          ))}
          <Button btnType='Success'>{this.state.isSignup ? 'SIGN UP' : 'SIGN IN'}</Button>
          <Button btnType='Danger' clicked={this.switchAuthModeHandler}>Switch to {!this.state.isSignup ? 'SIGN UP' : 'SIGN IN'}</Button>
        </form>
      );
    }

    return (
      <div className={classes.Auth}>
        <h4>Login</h4>
        {authRedirect}
        { errorMessage }
        { form }
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath,
    isPurchasing: state.burgerBuilder.purchasing
  };
};

const mapDispatchToProps = dispath => {
  return {
    onAuth: (email, password, method) => dispath(actions.auth(email, password, method)),
    onSetAuthRedirectPath: () => dispath(actions.setAuthRedirectPath('/'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
