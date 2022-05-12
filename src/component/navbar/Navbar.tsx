import "./Navbar.css";
import SearchBox from "./SearchBox";
function Navbar(props:any) {
  return (
    <div className="nav-container">
      <div className="nav-logo">Perfect Speaker</div>
      <SearchBox search={props.search}/>
      <a>Login</a>
    </div>
  );
}

export default Navbar;
