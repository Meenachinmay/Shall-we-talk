import React from "react";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
        <Navbar />
        <main style={{ flexGrow: '1'}}>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
