import Router from 'next/router';
import React, { Component } from 'react'
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';

import Form from './styles/Form';
import Error from './ErrorMessage';
import formatMoney from '../lib/formatMoney';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      id
      title
      description
      price
    }
  }
`;

class UpdateItem extends Component {
  state = {};

  // Doing this automatice binds "This" so you don't have to do it in the constructor
  // this is a great way to handle inputs
  handleChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  }

  updateItem = async (e, updateItemMutation) => {
    e.preventDefault();
    
    const res = await updateItemMutation({
      variables: {
        id: this.props.id,
        ...this.state,
      }
    });

    return res;
  }

  render() {
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
        {({ data }, loading) => {
          console.log('DATA', data);
          if (loading) return <p>Loading...</p>;
          if (!data.item) return <p>No Item Found for ID {this.props.id}</p>;

          return (
            <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
              {(updateItem, { loading, error, }) => (
                <Form onSubmit={e => this.updateItem(e, updateItem)}>
                  <Error error={error} />
                  <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="title">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="Title"
                      required
                      defaultValue={data.item.title}
                      value={this.state.title}
                      onChange={this.handleChange}
                    />
                  </fieldset>
                  <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="price">
                      Price
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      placeholder="Price"
                      required
                      defaultValue={data.item.price}
                      value={this.state.price}
                      onChange={this.handleChange}
                    />
                  </fieldset>
                  <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="description">
                      Description
                    </label>
                    <textarea
                      type="text"
                      id="description"
                      name="description"
                      placeholder="Description"
                      required
                      defaultValue={data.item.description}
                      value={this.state.description}
                      onChange={this.handleChange}
                    />
                  </fieldset>
                  <button type="submit">Submit</button>
                </Form>
              )}
            </Mutation>
          );
        }}
      </Query>
    )
  }
}

export { UPDATE_ITEM_MUTATION };
export default UpdateItem;
