import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ToDoItemForm from './ToDoItemForm';

const EditItemDetails = () => {
  const[state, setState] = useState({error: null, isLoaded: false});

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if(+id === 0) {
      setState({isLoaded: true})
    } else {
      fetch('http://localhost:8080/items/' + id)
      .then(res => res.json())
      .then(
        result => setState({isLoaded: true, item: result}),
        (error) => setState({isLoaded: true, error}));
    }
  }, [id]);

  const { error, isLoaded, item } = state;

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return showItem(item, history, setState);
  }
}

function handleSave(item, history, setState) {
  if(item.id) {
    saveItem('PUT', item.id, item, history, setState);
  } else {
    saveItem('POST', '', item, history, setState);
  }
}

function saveItem(method, itemId, item, history, setState) {
  fetch('http://localhost:8080/items/' + itemId,  {method, headers: {'Content-type': 'application/json; charset=UTF-8'}, body: JSON.stringify(item) })
      .then(
        () => history.push('/items'),
        (error) => setState({isLoaded: true, error}));
}

function showItem(item, history, setState) {
  return (
      <div class="card">
        <div class="card-header">{item ? 'Edit item: ' + item.id : 'Add Item'}</div>
        <div class="card-body">
          <ToDoItemForm formData={item} 
                        handleSave={(updatedItem) => handleSave(updatedItem, history, setState)} 
                        handleBack={() => history.goBack()}/>
        </div>
      </div>
  );
}

export default EditItemDetails;
