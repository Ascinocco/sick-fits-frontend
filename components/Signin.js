import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form'
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION(
    $email: String!
    $password: String!
  ) {
    signin(
      email: $email
      password: $password
    ) {
      id
      email
      name
    }
  }
`;

const DEFAULT_STATE = {
  email: '',
  name: '',
  password: '',
};

class Signin extends Component {
  state = DEFAULT_STATE

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSignin = async (e, signup) => {
    e.preventDefault();
    await signup();
    this.setState(DEFAULT_STATE);
  }

  render() {
    return (
      // refetch queries allows us to re-grab the logged in user in order to update our UI
      <Mutation mutation={SIGNIN_MUTATION} variables={this.state} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
        {(signin, { error, loading }) => {
          return (
            <Form method="post" onSubmit={e => this.handleSignin(e, signin)}>
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Sign into your account</h2>
                <Error error={error} />
                <label htmlFor="email">
                  Email
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    value={this.state.email}
                    onChange={this.saveToState}
                  />
                </label>
                <label htmlFor="password">
                  Password
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={this.state.password}
                    onChange={this.saveToState}
                  />
                </label>
      
                <button type="submit">Sign In!</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    )
  }
}

export default Signin;
