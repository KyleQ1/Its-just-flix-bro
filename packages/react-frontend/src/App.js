import logo from "./assets/netflix-logo.png";
import accountIcon from "./assets/account-icon.png"
import search from "./assets/search-icon.png"
import "./index.css";

function App() {
  return (
    <div>
      <header>
          <img src={logo} align="left"/>
          <img src={accountIcon} align="right"/>
          <img src={search} align="right"/>
      </header>
      <table width="30%">
            <tr>
              <td width="20%">Home</td>
              <td>TV Shows</td>
              <td width="20%">Movies</td>
              <td>My List</td>
            </tr>
          </table>
    </div>
  );
}

export default App;
