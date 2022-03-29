import { Outlet, Link } from "react-router-dom";
import HomePage from "./HomePage";
import Navbar from "./Navbar/Navbar";

const Layout = () => {
  return (

    <div>
      <main>
          <Outlet />
      </main>
    </div>


  )
};

export default Layout;