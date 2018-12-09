import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme'
import CloseButton from './styles/CloseButton';
import SickButton from './styles/SickButton';

import React from 'react'

const Cart = () => (
  <CartStyles open>
    <header>
      <CloseButton title="close">
        &times;
      </CloseButton>
      <Supreme>Your Cart</Supreme>
      <p>You Have __ Items in your cart.</p>
    </header>

    <footer>
      <p>$10.10</p>
      <SickButton>Checkout</SickButton>
    </footer>
  </CartStyles>
);

export default Cart