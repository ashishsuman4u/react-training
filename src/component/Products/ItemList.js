import React, { Component } from "react";
import * as _ from "lodash";

import Card from "./Card";
import Pagination from "./Pagination";

class ItemList extends Component {
  itemCount = 0; // As we are not getting correct totalCount from API.
  renderItems(start, size) {
    const products = this.props.products;
    const pagination = _.find(products.pagination, item => {
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
      _.filter(this.props.products.items, function(item) {
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
          isAdded={_.some(this.props.items, addedItem => {
            return addedItem.id === item.id;
          })}
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

export default ItemList;
