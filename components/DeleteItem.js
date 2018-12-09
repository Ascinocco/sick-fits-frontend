import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { ALL_ITEMS_QUERY } from './Items';

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

class DeleteItem extends Component {
  // apollo provides the cache here when you provide a function to the update prop
  // it also provides the payload.
  // This is kind of like a one of reducer but in the component it self
  update = (cache, payload) => {
    // remove deleted item from cache
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
    data.items = data.items.filter(item => item.id !== payload.data.deleteItem.id);
    // update the cache
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
  }

  render() {
    return (
      <Mutation
        mutation={DELETE_ITEM_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
      >
      {(deleteItem, { error }) => (
        <button onClick={() => {
          if (confirm('Are you sure you want to delete this item?')) {
            deleteItem().catch(err => {
              alert(err.message);
            });
          }
        }}>
          {this.props.children}
        </button>
      )}
      </Mutation>
    )
  }
}

export default DeleteItem;
