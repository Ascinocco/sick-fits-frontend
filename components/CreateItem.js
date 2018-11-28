import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Form from './styles/Form';
import Error from './ErrorMessage';
import formatMoney from '../lib/formatMoney';

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

class CreateItem extends Component {
  state = {
    title: '',
    description: '',
    price: 0,
    image: '',
    largeImage: '',
  };

  // Doing this automatice binds "This" so you don't have to do it in the constructor
  // this is a great way to handle inputs
  handleChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  }

  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error, }) => (
          <Form onSubmit={(e) => {
            e.preventDefault();
            
          }}>
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
                value={this.state.description}
                onChange={this.handleChange}
              />
            </fieldset>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Mutation>
    )
  }
}

export { CREATE_ITEM_MUTATION };
export default CreateItem;
