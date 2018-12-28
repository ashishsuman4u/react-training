import React from "react";
import { PropTypes } from "prop-types";

const Error = ({ message }) => {
  return <h1>Sorry we are getting {message} error from server.</h1>;
};

Error.propTypes = {
  message: PropTypes.string.isRequired
};

export default Error;
