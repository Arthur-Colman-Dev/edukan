import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';

import {
  Column
} from 'components';

import {
  MOVE_CARD
} from 'actionTypes';

const columns = [
  {
    id: 1,
    name: 'A fazer',
    resolveStatus: false,
  },
  {
    id: 2,
    name: 'Fazendo',
    resolveStatus: false,
  },
  {
    id: 3,
    name: 'Finalizadas',
    resolveStatus: true,
  }
]

const Board = (props) => {

  const dispatch = useDispatch();

  const onDragEnd = ({ draggableId, source, destination }) => {
    if(destination && source.droppableId !== destination.droppableId) {
      dispatch({
        type: MOVE_CARD,
        nextColumn: destination.droppableId,
        cardId: draggableId
      })
    }
  }

  return (
    <div className='board'>
      <DragDropContext onDragEnd={onDragEnd}>
        {
          columns.map((column) => {
            const {
              id: columnId,
              name,
              resolveStatus
            } = column

            return (
              <Droppable
                key={columnId.toString()}
                droppableId={columnId.toString()}
              >
                {
                  (providedColumn) => (
                    <Column
                      column={{
                        id: columnId,
                        name,
                        resolveStatus,
                      }}
                      providedColumn={providedColumn}
                      innerRef={(ref) => {
                        providedColumn.innerRef(ref);
                      }}
                      itemCount={1}
                      {...providedColumn.droppableProps}
                    />
                  )}
              </Droppable>
            )
          })
        }
      </DragDropContext>
    </div >
  )
}

export default React.memo(Board);