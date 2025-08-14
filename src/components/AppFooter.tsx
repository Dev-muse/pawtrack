import React from "react";

const AppFooter = () => {
  return (
    <footer className="border-t border-black/5 mt-auto ">
      <small className="opacity/50">
        &copy; {new Date().getFullYear()} Rapidmuse, all rights reserved.
      </small>
    </footer>
  );
};

export default AppFooter;
