import { Component } from 'react'
import Downshift, { resetIdCounter } from 'downshift';
import Router from 'next/router';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';

import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

const SEARCH_ITEMS_QUERY = gql`
  query SEARCH_ITEMS_QUERY($searchTerm: String!) {
    items(where: {
      OR: [ # finds where one of these comes back true
        { title_contains: $searchTerm }
        { description_contains: $searchTerm }
      ]
     }) {
       id
       image
       title
     }
  }
`;

function routeToItem(item) {
  Router.push({
    pathname: '/item',
    query: {
      id: item.id,
    },
  });
}

class Search extends Component {
  state = {
    items: [],
    loading: false,
  };

  onChange = debounce(async (e, client) => { // debounce keeps us from hitting the server too many times if the user is type fast
    this.setState({ loading: true });
    const res = await client.query({
      query: SEARCH_ITEMS_QUERY,
      variables: { searchTerm: e.target.value }
    })
    console.log('res', res);
    this.setState({ items: res.data.items });
  }, 350)

  render() {
    resetIdCounter();
    return (
      <SearchStyles>
        <Downshift
          itemToString={item => (item === null) ? '' : item.title}
          onChange={routeToItem}
        >
          {({ getInputProps, getItemProps, isOpen, inputValue, highlightedIndex }) => (
            <div>
              <ApolloConsumer>
                {(client) => (
                  <input
                    {...getInputProps({
                      type: 'search',
                      placeholder: 'Search for an item',
                      id: 'search',
                      onChange: e => { e.persist(); this.onChange(e, client); },
                      className: this.state.loading ? 'loading' : '',
                    })}
                  />
                )}
              </ApolloConsumer>
              { isOpen && (
                <DropDown>
                  {this.state.items.map((item, i) => (
                    <DropDownItem key={item.id} {...getItemProps({ item })} highlighted={i === highlightedIndex} >
                      <img width="50" src={item.image} alt={item.title} />
                      {item.title}
                    </DropDownItem>
                 ))}
                 {!this.state.items.length && !this.state.loading && (
                   <DropDownItem>
                     Nothing found for {inputValue}
                   </DropDownItem>
                 )}
                </DropDown>
              )}
          </div>
        )}
      </Downshift>
      </SearchStyles>
    )
  }
}

export default Search;
