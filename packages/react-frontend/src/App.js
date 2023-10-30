import logo from "./assets/netflix-logo.png";
import accountIcon from "./assets/account-icon.png"
import search from "./assets/search-icon.png"
import "./index.css";

function App() {
  return (
    <div>
      <header>
        <p>
          <img src={logo} align="left"/>
          <img src={accountIcon} align="right"/>
          <img src={search} align="right"/>
          <center><b><h2>This is the header</h2></b></center>
        </p>
        <hr></hr>
      </header>
    </div>
  );
}

export default App;
