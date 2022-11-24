import { Switch, Route } from 'react-router-dom';

import BlogList from "./pages/Blogs/BlogList";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Post from './pages/Posts/Post';

function App() {

  return (
   
      <Switch>
          <Route path='/' exact>
            <Login/>
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
              <Login/>
          </Route>
      </Switch>
    
  );
}

export default App;
