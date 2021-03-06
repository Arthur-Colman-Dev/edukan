import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../assets/logo.png';
import ReactLoading from 'react-loading';

import {
  Column,
  GoogleLogin,
  Modal,
} from 'components';

import {
  MOVE_CARD,
} from 'actionTypes';

import {
  getColumnCards,
  getLoadingState
} from 'selectors';

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

const Board = () => {

  const dispatch = useDispatch();

  const columnCards = useSelector(getColumnCards)
  const isLoading = useSelector(getLoadingState)

  const onDragEnd = ({ draggableId, source, destination }) => {
    if (destination && source.droppableId !== destination.droppableId) {
      let status = ['TODO', 'DOING', 'DONE']

      dispatch({
        type: MOVE_CARD,
        nextStatus: status[destination.droppableId - 1],
        cardId: draggableId
      })
    }
  }

  return (
    <div className='board'>
      <div className='board__header'>
        <img className='logo' src={Logo} />
        <Modal />
        <div className="buttons__container">
          <GoogleLogin />
        </div>
      </div>
      <div className='board__container'>
        {
          isLoading ?
            <ReactLoading type='bars' color='#BFE5CA' height={'18%'} width={'18%'} className='loader' />
            :
            (<DragDropContext onDragEnd={onDragEnd}>
              {
                columns.map((column) => {
                  const {
                    id: columnId,
                    name,
                    resolveStatus
                  } = column

                  const columnCardsCount = columnCards[columnId].length

                  return (
                    <Droppable
                      key={columnId.toString()}
                      droppableId={columnId.toString()}
                      isDropDisabled={columnId === 3}
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
                            itemCount={columnCardsCount}
                            {...providedColumn.droppableProps}
                          />
                        )}
                    </Droppable>
                  )
                })
              }
            </DragDropContext>)
        }
      </div>
    </div >
  )
}

export default React.memo(Board);