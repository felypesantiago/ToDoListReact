import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ToDoList.css';

const ToDoList = () => {

  const[state, setState] = useState({
    error: null,
    isLoaded: false,
    listItems: []
  });

  useEffect(() => {
    fetch('http://localhost:8080/items/')
      .then(res => res.json())
      .then(
        result => {
          setState({
            isLoaded: true,
            listItems: result.items
          });
        },
        (error) => {
          setState({
            isLoaded: true,
            error
          });
        }
      );
  }, [state.isLoaded]);

  return getContent(state, setState);
}

function getContent({ error, isLoaded, listItems }, setState) {
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return showItems(listItems, setState);
  }
}

function showItems(listItems, setState) {
  return (
    listItems && <ul className="list-group todolist">
      {listItems.map(item => {
        return (
          <li key={item.id} className="list-group-item text-center">
            <Link to={"/items/" + item.id}>{item.title}</Link>
            <button type="button" className="delete-button btn btn-default" aria-label="Delete item" onClick={() => deleteItem(item.id, setState)}>
              <span className="icon fa fa-times" aria-hidden="true"></span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function deleteItem(id, setState) {
  fetch('http://localhost:8080/items/' + id,  {method: 'DELETE'})
    .then(
      () => setState({isLoaded: false}),
      (error) => setState({isLoaded: true, error}));
}

export default ToDoList;
