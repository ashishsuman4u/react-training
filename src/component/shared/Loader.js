import React from "react";
import { PropTypes } from "prop-types";

const Loader = ({ size }) => {
  const loaderCss = `ui ${size} active centered inline loader`;
  return <div className={loaderCss} />;
};

Loader.propTypes = {
  size: PropTypes.string.isRequired
};

export default Loader;
