import PropTypes from 'prop-types';
import formatMoney from '../lib/formatMoney';
import styled from 'styled-components';
import RemoveFromCart from './RemoveFromCart';

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid ${props => props.theme.lightgrey};
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 10px;
  }
  h3, p {
    margin: 0;
  }
`;

const CartItem = (props) => {
  const { id, quantity, item } = props.cartItem;
  if (!item) return null; // this handles the case in which an item has been deleted from the db
  return (
    <CartItemStyles>
      <img width="100" src={item.image} alt={item.title} />
      <div className="cart-item-details">
        <h3>{item.title}</h3>
        <p>
          {formatMoney(item.price)}
          {' - '}
          <em>
            {`${quantity} x ${formatMoney(item.price)}`}
          </em>
        </p>
      </div>
      <RemoveFromCart id={id} />
    </CartItemStyles>
  )
}

CartItem.propTypes = {
  CartItem: PropTypes.object.isRequired,
};

export default CartItem
