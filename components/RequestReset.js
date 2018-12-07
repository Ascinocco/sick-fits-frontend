import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form'
import Error from './ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION(
    $email: String!
  ) {
    requestReset(
      email: $email
    ) {
      message
    }
  }
`;

const DEFAULT_STATE = {
  email: '',
};

class Signin extends Component {
  state = DEFAULT_STATE

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSignin = async (e, reset) => {
    e.preventDefault();
    await reset();
    this.setState(DEFAULT_STATE);
  }

  render() {
    return (
      // refetch queries allows us to re-grab the logged in user in order to update our UI
      <Mutation mutation={REQUEST_RESET_MUTATION} variables={this.state}>
        {(reset, { error, loading, called }) => {
          return (
            <Form method="post" onSubmit={e => this.handleSignin(e, reset)}>
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Request a password reset</h2>
                <Error error={error} />
                {!error && !loading && called && <p>Success! Check your email for a reset link!</p>}
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

                <button type="submit">Request Reset!</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    )
  }
}

export default Signin;
