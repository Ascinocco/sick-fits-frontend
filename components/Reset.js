import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import Form from './styles/Form'
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User'

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      email
      name
    }
  }
`;

const DEFAULT_STATE = {
  password: '',
  confirmPassword: '',
};

class Reset extends Component {
  static propTypes = {
    resetToken: PropTypes.string.isRequired,
  }

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
      <Mutation mutation={RESET_MUTATION} variables={{ ...this.state, resetToken: this.props.resetToken }} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
        {(reset, { error, loading }) => {
          return (
            <Form method="post" onSubmit={e => this.handleSignin(e, reset)}>
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Reset your password</h2>
                <Error error={error} />
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
                <label htmlFor="confirmPassword">
                  Password
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="confirmPassword"
                    value={this.state.confirmPassword}
                    onChange={this.saveToState}
                  />
                </label>
                <button type="submit">Reset your password!</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    )
  }
}

export default Reset;
