import React, { Component } from "react";
import * as _ from "lodash";
import { PropTypes } from "prop-types";

import Card from "./Card";
import Pagination from "./Pagination";

class ItemList extends Component {
  itemCount = 0; // As we are not getting correct totalCount from API.
  renderItems(start, size) {
    const products = this.props.products;
    const pagination = products.pagination.find(item => {
      return (
        item.pageIndex === products.currentPage.pageIndex &&
        item.sortDirection === products.currentPage.sortDirection &&
        item.filterBySize === products.currentPage.filterBySize
      );
    });
    this.itemCount = products.totalItemCount;
    if (pagination && pagination.itemIds && pagination.itemIds.length < 8) {
      this.itemCount = pagination.itemIds.length;
    }
    const productList = _.orderBy(
      this.props.products.items.filter(item => {
        return pagination.itemIds.includes(item.id);
      }),
      ["price"],
      products.currentPage.sortDirection
    );
    return productList.slice(start, size).map(item => {
      return (
        <Card
          key={item.id}
          item={item}
          isAdded={this.props.items.some(addedItem => addedItem.id === item.id)}
          addItemToCart={this.props.addItemToCart}
        />
      );
    });
  }

  render() {
    const products = this.props.products;
    return (
      <div className="ui equal width grid">
        <div className="row">{this.renderItems(0, 4)}</div>
        <div className="row">{this.renderItems(4, 8)}</div>
        <div className="row">
          <Pagination
            pageIndex={products.currentPage.pageIndex}
            pageSize={products.currentPage.pageSize}
            totalItem={this.itemCount}
            changePage={this.props.changePage}
          />
        </div>
      </div>
    );
  }
}

ItemList.propTypes = {
  items: PropTypes.array.isRequired,
  products: PropTypes.object.isRequired,
  changePage: PropTypes.func.isRequired
};

export default ItemList;
