import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

const ItemDetails = (props) => {
  const[state, setState] = useState({error: null, isLoaded: false});

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    fetch('http://localhost:8080/items/' + id)
      .then(res => res.json())
      .then(
        result => setState({isLoaded: true,item: result}),
        (error) => setState({isLoaded: true, error}));
  }, [id]);

  const { error, isLoaded, item } = state;

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return showItem(item, history);
  }
}

function showItem(item, history) {
  return (
    item && <div className="card">
      <div className="card-header">{item.title}</div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-3">ID:</div>
              <div className="col-md-6">{item.id}</div>
            </div>
            <div className="row">
              <div className="col-md-3">Description:</div>
              <div className="col-md-6">{item.description}</div>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-4">
            <button className="btn btn-outline-secondary mr-3" style={{width: '80px'}} onClick={() => history.goBack()}>
                <i className="fa fa-chevron-left"></i> Back
            </button>
            <button className="btn btn-outline-primary" style={{width: '80px'}} onClick={() => history.push('/items/' + item.id +'/edit')}>
                Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetails;
