import BlogList from "./components/BlogList";
import Register from "./components/Register";
import Header from "./components/Layout/Header";
import Login from "./components/Login";

import { useSelector, useDispatch } from 'react-redux';

function App() {

  const dispatch = useDispatch();
  const login = useSelector((state) => state.login.log);
  console.log(login);

  return (

    <div >
      <section>
      <Header/>
      </section>
      <section>
        {/*<BlogList/>*/}
        
        <Register/>
        
      </section>
    </div>
  );
}

export default App;
