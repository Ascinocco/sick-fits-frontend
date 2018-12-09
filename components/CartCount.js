import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const AnimitationStyles = styled.span`
  position: relative;
  .count {
    display: block;
    position: relative;
    transition: all 0.4s;
    backface-visibility: hidden;
  }
  /* initial state of the entered dot */
  .count-enter {
    transform: rotateX(0.5turn);
  }

  .count-enter-active {
    transform: rotateX(0);
  }

  .count-exit {
    top: 0;
    position: absolute;
    transform: rotateX(0);
  }

  .count-exit-active {
    transform: rotateX(0.5turn);
  }
`;

const Dot = styled.div`
  background: ${props => props.theme.red};
  color: white;
  border-radius: 50%;
  padding: 0.5rem;
  line-height: 2rem;
  min-width: 3rem;
  margin-left: 1rem;
  font-weight: bold;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
`;


const CartCount = ({ count }) => (
  <AnimitationStyles>
    <TransitionGroup>
      <CSSTransition className="count" classNames="count" key={count} timeout={{ enter: 400, exit: 400 }} unmountOnExit>
        <Dot>
          {count}
        </Dot>
      </CSSTransition>
    </TransitionGroup>
  </AnimitationStyles>
);

export default CartCount
