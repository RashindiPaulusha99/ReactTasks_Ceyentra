import BlogList from "./components/BlogList";
import Register from "./components/Register";
import Header from "./components/Layout/Header";
import Login from "./components/Login";


function App() {
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
