import SingleItem from '../components/SingleItem';

const Item = props => (
  <div>
    {/* Anthony - remember that each top level page has access to query and mutation props
      but you need to pass it down to the sub components that need access to it
      in this case, you need to pass down the query item
    */}
    {console.log('PAGE PROPS', props)}
    <SingleItem id={props.query.id} />
  </div>
);

export default Item;
