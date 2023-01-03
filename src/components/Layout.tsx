import React from "react";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar";
import appBg from "../images/bg2.png";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Navbar />
        <main
          style={{
            flexGrow: "1",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: `url(${appBg})`,
          }}
        >
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
