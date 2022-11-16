import BlogList from "./components/BlogList";
import Header from "./components/Layout/Header";



function App() {
  return (
    <div >
      <section>
      <Header/>
      </section>
      <section>
        <BlogList/>
      </section>
    </div>
  );
}

export default App;
