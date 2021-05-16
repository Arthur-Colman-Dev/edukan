import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Draggable } from 'react-beautiful-dnd';

import {
  Card,
} from 'components';

import {
  getColumnCards
} from 'selectors'

const Column = (props) => {
  const {
    column: {
      name,
      id: columnId
    },
    innerRef,
    isHighlighted,
    itemCount,
    providedColumn: {
      placeholder: providedColumnPlaceholder,
    },
  } = props;

  const columnCards = useSelector(getColumnCards)[columnId]

  const dispatch = useDispatch();

  return (
    <div
      ref={innerRef}
      className={classnames(
        'column',
        { 'column--highlighted': isHighlighted },
      )}
    >
      <div
        className={classnames(
          'column__info__background',
          { 'column__info__background--highlighted': isHighlighted },
        )}
      >
        <div className="label14--regular column__info">
          <span className="column__title">
            {name}
          </span>
          <span className="column__count">{itemCount}</span>
        </div>
      </div>
      <div className="column__data">
        {
          columnCards.map(({id}, cardIndex) => (
            <Draggable
              key={id.toString()}
              draggableId={id.toString()}
              index={cardIndex}
              disableInteractiveElementBlocking
            >
              {
                (providedCard) => (
                  <Card
                    cardId={id}
                    innerRef={providedCard.innerRef}
                    provided={providedCard}
                  />
                )
              }
            </Draggable>
          ))
        }
        {providedColumnPlaceholder}
      </div>
    </div>
  );
};

Column.defaultProps = {
  isHighlighted: false,
};

Column.propTypes = {
  column: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    resolveStatus: PropTypes.bool.isRequired,
  }).isRequired,
  isHighlighted: PropTypes.bool,
  itemCount: PropTypes.number.isRequired,
  innerRef: PropTypes.func.isRequired,
  providedColumn: PropTypes.shape({
    placeholder: PropTypes.object.isRequired,
  }).isRequired,
};

export default React.memo(Column);
