import React, { Fragment } from "react";

import ThemeContext from "../context/ThemeContext";

const Filters = ({
  filterBySize,
  changeSelectedSize,
  sortDirection,
  changeSortDirection
}) => {
  return (
    <ThemeContext.Consumer>
      {value => (
        <Fragment>
          <div className="column panel">
            <div
              className={`ui secondary inverted ${
                value.theme
              } top attached segment`}>
              Filter by Sizes
              <button
                onClick={() => {
                  changeSelectedSize("");
                }}
                className={
                  filterBySize === ""
                    ? "ui disabled right floated basic inverted button label"
                    : "ui right floated basic inverted button label"
                }>
                Show All
              </button>
            </div>
            <div className="ui bottom attached segment">
              <div className="ui equal sized grid">
                <div className="row">
                  <div className="four wide column">
                    {showButton(
                      "XS",
                      changeSelectedSize,
                      filterBySize,
                      value.theme
                    )}
                  </div>
                  <div className="four wide column">
                    {showButton(
                      "S",
                      changeSelectedSize,
                      filterBySize,
                      value.theme
                    )}
                  </div>
                  <div className="four wide column">
                    {showButton(
                      "M",
                      changeSelectedSize,
                      filterBySize,
                      value.theme
                    )}
                  </div>
                  <div className="four wide column">
                    {showButton(
                      "ML",
                      changeSelectedSize,
                      filterBySize,
                      value.theme
                    )}
                  </div>
                </div>
                <div className="ui equal sized grid">
                  <div className="row">
                    <div className="four wide column">
                      {showButton(
                        "L",
                        changeSelectedSize,
                        filterBySize,
                        value.theme
                      )}
                    </div>
                    <div className="four wide column">
                      {showButton(
                        "XL",
                        changeSelectedSize,
                        filterBySize,
                        value.theme
                      )}
                    </div>
                    <div className="four wide column">
                      {showButton(
                        "XXL",
                        changeSelectedSize,
                        filterBySize,
                        value.theme
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`ui secondary inverted ${
                value.theme
              } top attached segment`}>
              Order By Price
            </div>
            <div className="ui bottom attached segment">
              <div className="ui vertical text menu">
                <button
                  onClick={() => changeSortDirection("asc")}
                  className={
                    sortDirection === "asc"
                      ? `item basic ${value.theme} button noborder`
                      : `active item basic ${value.theme} button noborder`
                  }>
                  Low to High
                </button>
                <button
                  onClick={() => changeSortDirection("desc")}
                  className={
                    sortDirection === "desc"
                      ? `item basic ${value.theme} button noborder`
                      : `active item basic ${value.theme} button noborder`
                  }>
                  High to Low
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </ThemeContext.Consumer>
  );
};

function showButton(size, changeSelectedSize, filterBySize, color) {
  return (
    <button
      onClick={() => {
        changeSelectedSize(size);
      }}
      className={
        filterBySize === size
          ? `ui circular dark ${color} active button`
          : `ui circular ${color} button`
      }>
      {size}
    </button>
  );
}

export default Filters;
