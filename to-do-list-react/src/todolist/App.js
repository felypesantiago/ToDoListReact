import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Redirect, Switch, Link } from 'react-router-dom';

import './App.css';
import ToDoList from './ToDoList';
import Credits from './Credits';
import ItemDetails from './ItemDetails';
import EditItemDetails from './EditItemDetails';

const App = () => {
  return (
    <Router>
      <div>
        <nav className='navbar navbar-expand navbar-light bg-light'>
          <a className='navbar-brand'>To Do List</a>
          <ul className='nav nav-pills'>
            <li><NavLink to="/items" className="nav-link">Items</NavLink></li>
            <li><NavLink to="/credits" className="nav-link">Credits</NavLink></li>
          </ul>
          <Link to='/items/0/edit'>
            <button type="button" className="add-button btn btn-default" aria-label="Add item">
              <span  class="icon fa fa-plus" aria-hidden="true"></span>
            </button> 
          </Link>
        </nav>
        <div className='container'>
          <Switch>
            <Route exact path="/">
              <Redirect to="/items" />
            </Route>
            <Route exact path="/items">
              <ToDoList/>
            </Route>
            <Route exact path="/items/:id">
              <ItemDetails/>
            </Route>
            <Route exact path="/items/:id/edit">
              <EditItemDetails/>
            </Route>
            <Route path="/credits">
              <Credits/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
