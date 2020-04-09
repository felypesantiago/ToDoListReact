import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './ToDoList.css';
import { handleResult } from './Util'
import { getItems, deleteItem } from './ItemService'

const ToDoList = () => {

  const[state, setState] = useState({
    error: null,
    isLoaded: false,
    listItems: []
  });

  useEffect(() => getItems(result => setState({isLoaded: true, listItems: result.items}), error => setState({ isLoaded: true, error})), [state.isLoaded]);

  return handleResult(state, () => showItems(state, setState));
}

function showItems({listItems}, setState) {
  return (
    listItems && <ul className="list-group todolist">
      {listItems.map(item => {
        return (
          <li key={item.id} className="list-group-item text-center">
            <Link to={"/items/" + item.id}>{item.title}</Link>
            <button type="button" 
                    className="delete-button btn btn-default" 
                    aria-label="Delete item" 
                    onClick={() => deleteItem(item.id, () => setState({isLoaded: false}), error => setState({isLoaded: true, error}))}>
              <span className="icon fa fa-times" aria-hidden="true"></span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default ToDoList;
