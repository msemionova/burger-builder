import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter()});

describe('<BurgerBuilder />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onInitPurchase={()=>{}} onInitIngredients={()=>{}} />);
  });

  it('should render <BuildControls /> when receiving ingredients', () => {
    wrapper.setProps({
      ings: {salad: 0},
      totalPrice: 4,
    });
    expect(wrapper.find(BuildControls)).toHaveLength(1)
  });
});
