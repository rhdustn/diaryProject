import React from "react";

const Header = ({ headerText, left, right }) => {
  return (
    <>
      <header>
        <div className="head_btn_left">{left}</div>
        <div className="head_text">{headerText}</div>
        <div className="head_btn_right">{right}</div>
      </header>
    </>
  );
};

export default Header;
