import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import moment from 'moment';

const Card = (props) => {
  const {
    innerRef,
    provided,
    title,
    cardDone,
    courseName,
    url,
    dueDate,
  } = props;

  return (
    <div
      role="link"
      tabIndex="0"
      className={classnames(
        'card',
      )}
      ref={innerRef}
      onClick={() => window.open(url)}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <span className={classnames(
        'card__due-date',
        {'card__due-date--late': moment(dueDate).isBefore(moment())},
        {'card__due-date--done': cardDone}
      )}>{moment(dueDate).format('DD/MM/YY') === 'Invalid date' ? 'Sem prazo' : moment(dueDate).format('DD/MM/YY')}</span>
      <span
        className={classnames(
          'card__title',
          { 'card__title--done': cardDone},
        )}
      >
        {title}
      </span>
      <span className="card__course">{courseName}</span>
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
  cardId: PropTypes.string,
  courseName: PropTypes.string.isRequired,
  url: PropTypes.string,
  dueDate: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default React.memo(Card);
