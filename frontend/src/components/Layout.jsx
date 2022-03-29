import { Outlet, Link } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

const Layout = () => {
  return (

    <div>
      <div className="mb-20">
        <Navbar />
      </div>
      <main>
          <Outlet />
        {/*           <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/linkpage">LinkPage</Link>
          </li>
          <li>
            <Link to="/admintable">AdminTable</Link>
          </li>
        </ul>
      </nav> */}
      </main>
    </div>


  )
};

export default Layout;