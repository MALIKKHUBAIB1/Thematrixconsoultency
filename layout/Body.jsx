import Header from "../src/component/Header";
import Footer from "../src/component/Footer";
import { Outlet } from "react-router-dom";

function Body() {
  return (
    <main>
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
}

export default Body;
