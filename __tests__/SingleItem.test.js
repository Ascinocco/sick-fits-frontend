import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';

import SingleItem, { SINGLE_ITEM_QUERY } from '../components/SingleItem';
import { fakeItem } from '../lib/testUtils';

const getComponent = (mocks) => (
  <MockedProvider mocks={mocks}>
    <SingleItem id={123} />
  </MockedProvider>
);

describe('<SingleItem/>', () => {
  it('renders with proper data', async () => {
    const mocks = [
      {
        request: { query: SINGLE_ITEM_QUERY, variables: { id: '123' } },
        result: { data: { item: fakeItem() } }
      },
    ];
    const wrapper = mount(getComponent(mocks));
    expect(wrapper.text()).toContain('Loading...');
    await wait();
    wrapper.update();
    expect(toJSON(wrapper.find('h2'))).toMatchSnapshot();
    expect(toJSON(wrapper.find('img'))).toMatchSnapshot();
    expect(toJSON(wrapper.find('p'))).toMatchSnapshot();
  });

  it('Errors with a not found item', async () => {
    const mocks = [
      {
        request: { query: SINGLE_ITEM_QUERY, variables: { id: '123' } },
        result: { data: { item: fakeItem() } }
      },
    ];

    const wrapper = mount(getComponent(mocks));
    await wait();
    wrapper.update();
    const item = wrapper.find('[data-test="graphql-error"]');
    expect(item.text()).toContain('Items Not Found!');
    expect(toJSON(item)).toMatchSnapshot();
  });
});
