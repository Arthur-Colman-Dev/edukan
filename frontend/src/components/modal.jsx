import React, { useState, useDis } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import {
  CREATE_CARD
} from 'actionTypes';


const Modal = (props) => {

  const dispatch = useDispatch()

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch({
      type: CREATE_CARD,
      card: {
        courseWorkId: uuidv4(),
        dueDate: event.target[0].value,
        title: event.target[1].value,
        courseName: event.target[2].value,
        status: 'TODO'
      }
    })

    setIsModalOpen(false);
  }

  return (
    <div className="modal">
      <div className="modal__button" onClick={() => setIsModalOpen(true)}>
        Criar tarefa
      </div>
      {
        isModalOpen &&
        <div className="modal__content">
          <form onSubmit={handleSubmit} className="modal__form">
            <div className="input__container">
              <span>Prazo:</span>
              <input type="text" name="dueDate" placeholder="2021 - 01 - 30"/>
            </div>
            <div className="input__container">
              <span>Título:</span>
              <input type="text" name="title"/>
            </div>
            <div className="input__container">
              <span>Curso:</span>
              <input type="text" name="course"/>
            </div>
            <div className="form__actions">
              <div className="form__actions__cancel" onClick={() => setIsModalOpen(false)}>Cancelar</div>
              <input type="submit" className="form__actions__accept" value="Criar" />
            </div>
          </form>
        </div>
      }
    </div>
  )
}

export default React.memo(Modal)