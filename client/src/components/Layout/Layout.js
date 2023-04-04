import React from "react";
import Footer from "./Footer";
import TopBar from "./TopBar";
import SearchBar from "./SearchBar";
import Navbar from "./Navbar";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

const Layout = ({ children, description, keywords, title, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <TopBar />
      <SearchBar />
      <Navbar />
      <main style={{ minHeight: "80vh" }}>
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "CHOICE - Your Shopping Partner",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb",
  author: "Syed Rehan Ali Shah",
};
export default Layout;
