import React, { Component, Fragment } from "react";
import classNames from "classnames";

export default (WrappedItem, showButton) => {
  class RenderCartItem extends Component {
    renderButton() {
      return (
        <div className="extra content">
          <button
            type="button"
            className={classNames(
              "ui secondary inverted",
              { disabled: this.props.count === 1 },
              "button"
            )}
            onClick={() => {
              this.props.decreaseItemCount(
                this.props.item.id,
                this.props.count - 1
              );
            }}>
            -
          </button>
          <label className="ui input">{this.props.count}</label>
          <button
            type="button"
            className="ui secondary inverted button"
            onClick={() => {
              this.props.increaseItemCount(
                this.props.item.id,
                this.props.count + 1
              );
            }}>
            +
          </button>
          <button
            type="button"
            className="ui small red button"
            onClick={() => {
              this.props.removeItemFromCart(this.props.item.id);
            }}>
            Remove
          </button>
        </div>
      );
    }

    render() {
      if (!showButton) {
        return <WrappedItem {...this.props} />;
      } else {
        return (
          <Fragment>
            <WrappedItem {...this.props}>{this.renderButton()}</WrappedItem>
          </Fragment>
        );
      }
    }
  }
  return RenderCartItem;
};
