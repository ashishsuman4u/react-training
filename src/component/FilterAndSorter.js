import React, { Fragment } from "react";
import classNames from "classnames";
import { PropTypes } from "prop-types";

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
                className={classNames(
                  "ui",
                  { disabled: filterBySize === "" },
                  "right floated basic inverted button label"
                )}>
                Show All
              </button>
            </div>
            <div className="ui bottom attached segment">
              {renderButtonGrid(
                ["XS", "S", "M", "ML"],
                changeSelectedSize,
                filterBySize,
                value.theme
              )}
              {renderButtonGrid(
                ["L", "XL", "XXL"],
                changeSelectedSize,
                filterBySize,
                value.theme
              )}
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
                  className={classNames(
                    { active: sortDirection !== "asc" },
                    `item basic ${value.theme} button noborder`
                  )}>
                  Low to High
                </button>
                <button
                  onClick={() => changeSortDirection("desc")}
                  className={classNames(
                    { active: sortDirection !== "desc" },
                    `item basic ${value.theme} button noborder`
                  )}>
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

Filters.propTypes = {
  filterBySize: PropTypes.string.isRequired,
  changeSelectedSize: PropTypes.func.isRequired,
  sortDirection: PropTypes.string.isRequired,
  changeSortDirection: PropTypes.func.isRequired
};

const renderButtonGrid = (
  sizeArray,
  changeSelectedSize,
  filterBySize,
  theme
) => {
  return (
    <div className="ui equal sized grid">
      <div className="row">
        {sizeArray.map(size => {
          return (
            <div className="four wide column" key={size}>
              {showButton(size, changeSelectedSize, filterBySize, theme)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const showButton = (size, changeSelectedSize, filterBySize, color) => {
  const showDark = filterBySize === size;
  return (
    <button
      onClick={() => {
        changeSelectedSize(size);
      }}
      className={classNames(
        "ui circular",
        { dark: showDark },
        `${color} active button`
      )}>
      {size}
    </button>
  );
};

export default Filters;
