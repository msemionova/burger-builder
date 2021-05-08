import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

export class BurgerBuilder extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {...}
  // }
  state = {
    purchasing: false
  }

  componentDidMount() {
    this.props.onInitPurchase();
    this.props.onInitIngredients();
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.values(ingredients).reduce((acc, value) => {
      return acc += value;
    }, 0);
    return Boolean(sum);
  }

  purchaseHandler = (boolean) => {
    this.setState({purchasing: boolean});
  }

  authToPurchaseHandler = () => {
    this.props.onAuthToPurchase();
    this.props.onSetAuthRedirectPath('/checkout');
    this.props.history.push('/auth');
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  }

  render () {
    let burger = this.props.error ? "Ingredients can't be loaded!" : <Spinner />;
    let orderSummary = null;

    if (this.props.ings && this.props.totalPrice) {
      const disabledInfo = {
        ...this.props.ings
      };
      for (let key in disabledInfo) {
        if (disabledInfo.hasOwnProperty(key)) {
          disabledInfo[key] = disabledInfo[key] <= 0;
        }
      }

      burger = (
        <Auxiliary>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            isAuth={this.props.isAuthenticated}
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            purchaseble={this.updatePurchaseState(this.props.ings)}
            ordered={() => this.purchaseHandler(true)}
            auth={this.authToPurchaseHandler}
          />
        </Auxiliary>
      );
      orderSummary = <OrderSummary
        ingredients={this.props.ings}
        price={this.props.totalPrice}
        purchaseCanceled={() => this.purchaseHandler(false)}
        purchaseContinued={() => this.purchaseContinueHandler()}
      />
    }
    return (
      <Auxiliary>
        <Modal
          show={this.state.purchasing}
          modalClosed={() => this.purchaseHandler(false)}>
          {orderSummary}
        </Modal>
        {burger}
      </Auxiliary>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
    onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onAuthToPurchase: () => dispatch(actions.authToPurchase()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
