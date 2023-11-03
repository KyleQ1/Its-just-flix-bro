import "./index.css";
import NavBar from "./NavBar";
import Movie from "./Movie"

function App() {
  return (
    <div id="landing">
      <NavBar />
      <Movie genre="Action"/>
      <Movie genre="Comedy"/>
      <Movie genre="Horror"/>
    </div>
  );
}

export default App;
