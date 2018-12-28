import React, { Component } from "react";
import classNames from "classnames";
import { PropTypes } from "prop-types";

import ThemeContext from "../../context/ThemeContext";

class Promocode extends Component {
  static contextType = ThemeContext;
  state = { code: "" };

  renderSuccessMessage() {
    const { error, promocode, grandTotal } = this.props;
    if (error) {
      return (
        <div className="ui negative message">
          <p>Error! {error}</p>
        </div>
      );
    }
    if (promocode && promocode.id) {
      if (grandTotal >= promocode.minimumAmount) {
        return (
          <div className="ui positive message">
            <p>Promotion {promocode.id} applied!</p>
          </div>
        );
      } else {
        return (
          <div className="ui negative message">
            <p>
              Code {promocode.id} require minimum order amount of{" "}
              {promocode.currencyId} {promocode.minimumAmount}!
            </p>
          </div>
        );
      }
    }
  }

  render() {
    return (
      <div className="ui form segment">
        <div className="field">
          {this.renderSuccessMessage()}
          <label>Promo Code</label>
          <div className="ui action input">
            <input
              onChange={e => this.setState({ code: e.target.value })}
              type="text"
              value={this.state.code}
              placeholder="e.g. ABC123"
            />
            <button
              className={classNames(
                "ui",
                {
                  loading: this.props.isFetching,
                  disabled:
                    this.props.isFetching ||
                    !(this.state.code !== "" && this.props.grandTotal > 0),
                  [`${this.context.theme}`]:
                    this.state.code !== "" && this.props.grandTotal > 0
                },
                "button"
              )}
              onClick={() => {
                this.props.checkPromocodeFromApi(this.state.code);
              }}>
              Apply
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Promocode.propTypes = {
  grandTotal: PropTypes.number.isRequired
};

export default Promocode;
