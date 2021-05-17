import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';

const Card = (props) => {
  const {
    innerRef,
    provided,
    title,
    cardDone,
  } = props;

  const dispatch = useDispatch();

  return (
    <div
      role="link"
      tabIndex="0"
      className={classnames(
        'card',
      )}
      ref={innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <span
        className={classnames(
          'body1--regular',
          'card__title',
          { 'card__title--done': cardDone},
        )}
      >
        {title}
      </span>
    </div>
  );
};

Card.defaultProps = {
  provided: {
    dragHandleProps: {},
  },
};

Card.propTypes = {
  innerRef: PropTypes.func.isRequired,
  provided: PropTypes.shape({
    draggableProps: PropTypes.object.isRequired,
    dragHandleProps: PropTypes.object,
  }),
  cardId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default React.memo(Card);