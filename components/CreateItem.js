import Router from 'next/router';
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

  // Anthony - it might be good to disable the submit button
  // until the image is finished uploading because it will save the item without the image
  uploadFile = async e => {
    e.preventDefault();
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'sickfits');
    const res = await fetch('https://api.cloudinary.com/v1_1/dvyniy2pt/image/upload', {
      method: 'POST',
      body: data,
    });

    const file = await res.json();
    console.log(file);
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
    });
  }

  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error, }) => (
          <Form onSubmit={async e => {
            e.preventDefault();
            const res = await createItem();
            Router.push({
              pathname: '/item',
              query: { id: res.data.createItem.id },
            });
          }}>
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="file">
                Image
              </label>
              <input
                type="file"
                id="file"
                name="file"
                placeholder="Upload an image"
                required
                onChange={this.uploadFile}
              />
            </fieldset>
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
