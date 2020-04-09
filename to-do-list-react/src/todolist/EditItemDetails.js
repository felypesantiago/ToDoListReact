import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import ToDoItemForm from './ToDoItemForm';
import { getItem, updateItem, createItem } from './ItemService';
import { handleResult } from './Util';

const EditItemDetails = () => {
  const[state, setState] = useState({error: null, isLoaded: false});
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if(+id === 0) {
      setState({isLoaded: true})
    } else {
      getItem(id, 
        result => setState({isLoaded: true,item: result}), 
        error => setState({isLoaded: true, error}))
    }
  }, [id]);

  return handleResult(state, () => showItem(state.item, history));
}

function handleSave(item, history, setState) {
  if(item.id) {
    updateItem(item, () => history.push('/items'), error => setState({isLoaded: true, error}));
  } else {
    createItem(item, () => history.push('/items'), error => setState({isLoaded: true, error}));
  }
}

function showItem(item, history, setState) {
  return (
      <div className="card">
        <div className="card-header">{item ? 'Edit item: ' + item.id : 'Add Item'}</div>
        <div className="card-body">
          <ToDoItemForm formData={item} 
                        handleSave={(updatedItem) => handleSave(updatedItem, history, setState)} 
                        handleBack={() => history.goBack()}/>
        </div>
      </div>
  );
}

export default EditItemDetails;
