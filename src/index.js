import React from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Provider } from 'react-redux';

import {
  Column
} from 'components'

import "./scss/style.scss";

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

const App = () => {
  return (
    <Provider store={store}>
      <div className='board'>
        <DragDropContext>
          {
            columns.map((column) => {
              const {
                id: columnId
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
                          id: 1,
                          name: 'A fazer',
                          resolveStatus: false,
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
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));