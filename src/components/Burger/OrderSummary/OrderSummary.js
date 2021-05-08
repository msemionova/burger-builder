import React from 'react';
import PropTypes from 'prop-types';

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  const ingredientSummary = Object.entries(props.ingredients).map(([key, value]) => {
    return (
      <li key={key+value}>
        <span style={{textTransform: 'capitalize'}}>{key}:</span> {value}
      </li>
    )
  });
  return (
    <Auxiliary>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Total price: ${props.price.toFixed(2)}</strong></p>
      <p>Continue to checkout?</p>
      <Button btnType='Danger' clicked={props.purchaseCanceled}>CANCEL</Button>
      <Button btnType='Success' clicked={props.purchaseContinued}>CONTINUE</Button>
    </Auxiliary>
  )
};

orderSummary.propTypes = {
  ingredients: PropTypes.object.isRequired,
  price: PropTypes.number.isRequired,
  purchaseCanceled: PropTypes.func.isRequired,
  purchaseContinued: PropTypes.func.isRequired
}

export default orderSummary;
