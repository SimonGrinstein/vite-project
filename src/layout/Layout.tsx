import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

export default function Layout() {
  return (
    <>
      <div className="lessonContainer">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
