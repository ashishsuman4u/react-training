import React, { Component } from "react";
import { PropTypes } from "prop-types";

class ErrorBoundary extends Component {
  state = { error: null, info: null };

  componentDidCatch(error, info) {
    this.setState({ error, info });
  }

  render() {
    const { error, info } = this.state;
    if (error) {
      return (
        <div className="ui error message">
          <i className="close icon" />
          <div className="header">{this.props.header}</div>
          <ul className="list">
            <li>{error && error.toString()}</li>
            <li>{info && info.componentStack}</li>
          </ul>
        </div>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  header: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default ErrorBoundary;
