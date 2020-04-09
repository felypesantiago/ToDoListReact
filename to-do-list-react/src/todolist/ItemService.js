export const getItem = (id, onSuccess, onFailure) => {
    fetch('http://localhost:8080/items/' + id)
        .then(res => res.json())
        .then(onSuccess, onFailure);
}

export const updateItem = (item, onSuccess, onFailure) => {
    fetch('http://localhost:8080/items/' + item.id,  {method: 'PUT', headers: {'Content-type': 'application/json; charset=UTF-8'}, body: JSON.stringify(item) })
        .then(onSuccess, onFailure);
}

export const createItem = (item, onSuccess, onFailure) => {
    fetch('http://localhost:8080/items/',  {method: 'POST', headers: {'Content-type': 'application/json; charset=UTF-8'}, body: JSON.stringify(item) })
    .then(onSuccess, onFailure);
}

export const getItems = (onSuccess, onFailure) => {
    fetch('http://localhost:8080/items/')
    .then(res => res.json())
    .then(onSuccess, onFailure);
}

export const deleteItem = (id, onSuccess, onFailure) => {
    fetch('http://localhost:8080/items/' + id,  {method: 'DELETE'})
        .then(onSuccess, onFailure);
}