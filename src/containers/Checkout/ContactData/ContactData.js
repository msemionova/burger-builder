import React, {Component} from 'react';
import { connect } from "react-redux";

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import * as orderActions from '../../../store/actions/index';
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import { checkValidity, updateObject } from '../../../shared/utility';
import axios from "axios";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Name'
        },
        value: '',
        validation: {
          required: true,
          minLength: 2,
          valid: false,
          touched: false
        }
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          valid: false,
          touched: false
        }
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code'
        },
        value: '',
        validation: {
          isNumeric: true,
          required: true,
          minLength: 4,
          maxLength: 7,
          valid: false,
          touched: false
        }
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          valid: false,
          touched: false
        }
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email'
        },
        value: '',
        validation: {
          isEmail: true,
          required: true,
          minLength: 5,
          valid: false,
          touched: false
        }
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
              {value: 'fastest', displayValue: 'Fastest'},
              {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: 'fastest',
        validation: {
          valid: true,
          touched: false
        }
      }
    },
    formIsValid: false
  }

  orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formElementId in this.state.orderForm) {
      formData[formElementId] = this.state.orderForm[formElementId].value;
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.totalPrice,
      orderData: formData,
      userId: this.props.userId
    }

    this.props.onOrderBurger(order, this.props.token);
  }

  inputChangedHandler = (event, inputId) => {
    const updatedFormElement = updateObject(this.state.orderForm[inputId], {
      value: event.target.value,
      validation: {
        touched: true,
        valid: checkValidity(event.target.value, this.state.orderForm[inputId].validation)
      }
    });

    const updatedOrderForm = updateObject(this.state.orderForm, {
      [inputId]: updatedFormElement
    });

    let formIsValid = true;
    for (let inputId in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputId].validation.valid && formIsValid;
    }
    this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }

    let form = (
        <form onSubmit={this.orderHandler}>
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
          <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandler}>ORDER</Button>
        </form>
    );
    if (this.props.loading) {
      form = <Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        { form }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(orderActions.purchaseBurger(orderData, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
