import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form'
import Error from './ErrorMessage';

const SIGNU_MUTATION = gql`
  mutation SIGNU_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    signup(
      email: $email
      name: $name
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

class Signup extends Component {
  state = DEFAULT_STATE

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSignup = async (e, signup) => {
    e.preventDefault();
    await signup();
    this.setState(DEFAULT_STATE);
  }

  render() {
    return (
      <Mutation mutation={SIGNU_MUTATION} variables={this.state}>
        {(signup, { error, loading }) => {
          return (
            <Form method="post" onSubmit={e => this.handleSignup(e, signup)}>
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Sign up for an Account</h2>
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
                <label htmlFor="name">
                  Name
                  <input
                    type="text"
                    name="name"
                    placeholder="name"
                    value={this.state.name}
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
      
                <button type="submit">Sign Up!</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    )
  }
}

export default Signup;
