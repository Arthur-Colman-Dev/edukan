import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Draggable } from 'react-beautiful-dnd';

import {
  Card,
} from 'components';

import {
  getColumnCards
} from 'selectors';

const Column = (props) => {
  const {
    column: {
      name,
      id: columnId
    },
    innerRef,
    itemCount,
    providedColumn: {
      placeholder: providedColumnPlaceholder,
    },
  } = props;

  const columnCards = useSelector(getColumnCards)[columnId]

  return (
    <div
      ref={innerRef}
      className={classnames(
        'column',
      )}
    >
      <div
        className={classnames(
          'column__info__background',
        )}
      >
        <div className="column__info">
          <span className="column__title">
            {name}
          </span>
          <span className="column__count">{itemCount}</span>
        </div>
      </div>
      <div className="column__data">
        {
          columnCards.map(({courseWorkId, title, courseName, dueDate, url}, cardIndex) => (
            <Draggable
              key={courseWorkId}
              draggableId={courseWorkId}
              index={cardIndex}
              disableInteractiveElementBlocking
            >
              {
                (providedCard) => (
                  <Card
                    url={url}
                    cardId={courseWorkId}
                    innerRef={providedCard.innerRef}
                    provided={providedCard}
                    title={title}
                    courseName={courseName}
                    dueDate={dueDate}
                    cardDone={columnId === 3}
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

Column.propTypes = {
  column: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    resolveStatus: PropTypes.bool.isRequired,
  }).isRequired,
  itemCount: PropTypes.number.isRequired,
  innerRef: PropTypes.func.isRequired,
  providedColumn: PropTypes.shape({
    placeholder: PropTypes.object.isRequired,
  }).isRequired,
};

export default React.memo(Column);
