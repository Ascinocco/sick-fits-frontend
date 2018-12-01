import SingleItem from '../components/SingleItem';

const Item = props => (
  <div>
    {/* Anthony - remember that each top level page has access to query and mutation props
      but you need to pass it down to the sub components that need access to it
      in this case, you need to pass down the query item
    */}
    <SingleItem id={props.query.item} />
  </div>
);

export default Item;
