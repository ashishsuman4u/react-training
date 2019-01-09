import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

export default class Modal extends React.Component {
  static propTypes = {
    getContainer: PropTypes.func.isRequired
  };

  componentDidMount() {
    this._container = this.props.getContainer();
    this.forceUpdate();
  }

  getModalContent() {
    if (this.props.children) {
      return this.props.children;
    } else {
      return (
        <div
          onClick={e => {
            e.stopPropagation();
          }}
          className="ui standard modal visible active">
          <div className="header">{this.props.title}</div>
          <div className="content">
            <div className="description">{this.props.description}</div>
          </div>
          <div className="actions">{this.props.action}</div>
        </div>
      );
    }
  }

  render() {
    if (this._container) {
      return ReactDOM.createPortal(
        <div className="ui active dimmer">{this.getModalContent()}</div>,
        this._container
      );
    }
    return null;
  }
}
