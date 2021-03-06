import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { PropTypes } from "prop-types";
import ThemeContext from "../../context/ThemeContext";

const Pagination = ({ pageIndex, pageSize, totalItem, changePage }) => {
  return (
    <ThemeContext.Consumer>
      {value => (
        <div className={`ui ${value.theme} pagination menu`}>
          {getPages(pageIndex, pageSize, totalItem, changePage)}
        </div>
      )}
    </ThemeContext.Consumer>
  );
};

Pagination.propTypes = {
  totalItem: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired
};

const getPages = (pageIndex, pageSize, totalItem, changePage) => {
  const pages = [];
  const totalPages = Math.ceil(totalItem / pageSize);
  for (let i = 0; i < totalPages; i++) {
    const index = i + 1;
    pages.push(
      <Link
        key={i}
        to={`/${index}`}
        id={index}
        onClick={changePage}
        className={classNames(
          { disabled: pageIndex === index, active: pageIndex !== index },
          "item"
        )}>
        {index}
      </Link>
    );
  }
  return pages;
};

export default Pagination;
