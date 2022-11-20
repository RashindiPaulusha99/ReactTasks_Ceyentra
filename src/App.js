import { Switch, Route, Redirect } from 'react-router-dom';

import BlogList from "./components/BlogList";
import Register from "./components/Register";
import Header from "./components/Layout/Header";
import Login from "./components/Login";

import { useSelector, useDispatch } from 'react-redux';
import { Card } from '@mui/material';
import { useEffect, useState } from 'react';
import Post from './components/Post';

function App() {

  return (
   
      <Switch>
          <Route path='/' exact>
            <Register/>
          </Route>
          <Route path='/register'>
            <Register/>
          </Route>
          <Route path='/login' >
              <Login/>
          </Route>
          <Route path='/blog' >
              <BlogList/>
          </Route>
          <Route path='/post' >
              <Post/>
          </Route>
          <Route path='*' >
              <Register/>
          </Route>
      </Switch>
    
  );
}

export default App;
