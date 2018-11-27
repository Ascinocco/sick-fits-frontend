import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import Title from './styles/Title';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/ItemStyles';

import formatMoney from '../lib/formatMoney';

class Item extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired
  }

  render() {
    const { item } = this.props;
    return (
      <ItemStyles>
        {item.image && <img src={item.image} alt={item.title} />}
        <Title>
          <Link href={{ pathname: '/item', query: { item: item.id } }}>
            <a>{item.title}</a>
          </Link>
        </Title>
        <PriceTag>
          {formatMoney(item.price)}
        </PriceTag>
        <p>{item.description}</p>
        <div className="buttonList">
          <Link href={{ pathname: 'update', query: { id: item.id } }}>
            <a>Edit</a>
          </Link>
          <Link href={{ pathname: 'add', query: { id: item.id } }}>
            <a>Add To Cart</a>
          </Link>
          <Link href={{ pathname: 'delete', query: { id: item.id } }}>
            <a>Delete</a>
          </Link>
        </div>
      </ItemStyles>
    );
  }
}

export default Item;
