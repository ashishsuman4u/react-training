import React, { Component } from "react";
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
              className={
                this.props.isFetching
                  ? "ui loading disabled button"
                  : this.state.code !== "" && this.props.grandTotal > 0
                  ? `ui ${this.context.theme} button`
                  : "ui disabled button"
              }
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

export default Promocode;
