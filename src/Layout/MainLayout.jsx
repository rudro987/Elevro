import { Outlet } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import Header from "../Pages/Shared/Header/Header";

const MainLayout = () => {
  return (
    <div className="flex w-full flex-col items-center min-h-screen">
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
