import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import TopBar from "./TopBar";
import SearchBar from "./SearchBar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <TopBar />
      <SearchBar />
      <Navbar />
      <Header />
      <main style={{ minHeight: "80vh" }}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
