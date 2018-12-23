import React from "react";

const Loader = ({ size }) => {
  const loaderCss = `ui ${size} active centered inline loader`;
  return <div className={loaderCss} />;
};

export default Loader;
