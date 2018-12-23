import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";

import { fetchProduct, updateCurrentIndex } from "../action/product";
import { addToCart } from "../action/cart";
import ItemList from "../component/Products/ItemList";
import FilterAndSorter from "../component/FilterAndSorter";
import Error from "../component/Error";
import Loader from "../component/shared/Loader";
import Modal from "../portal/Modal";
import ThemeContext from "../context/ThemeContext";

class Product extends Component {
  static contextType = ThemeContext;
  state = {
    pageSize: 8,
    pageIndex: 1,
    sortDirection: "asc",
    filterBySize: ""
  };

  componentDidMount() {
    let index = "";
    if (this.props.match) {
      index = this.props.match.params.page;
    }
    if (index !== "") {
      const currentIndex = parseInt(index);
      if (!isNaN(currentIndex)) {
        this.setState({ pageIndex: currentIndex }, this.getProducts);
      } else {
        this.getProducts();
      }
    } else {
      this.getProducts();
    }
  }

  changePage = e => {
    this.setState({ pageIndex: parseInt(e.target.id) }, this.getProducts);
  };

  getProducts = () => {
    const { dispatch } = this.props;
    const currentPage = _.find(this.props.products.pagination, page => {
      return (
        page.pageIndex === this.state.pageIndex &&
        page.sortDirection === this.state.sortDirection &&
        page.filterBySize === this.state.filterBySize
      );
    });
    if (currentPage) {
      dispatch(
        updateCurrentIndex(
          this.state.pageIndex,
          this.state.pageSize,
          this.state.sortDirection,
          this.state.filterBySize
        )
      );
    } else {
      dispatch(
        fetchProduct(
          this.state.pageIndex,
          this.state.pageSize,
          this.state.sortDirection,
          this.state.filterBySize
        )
      );
    }
  };

  addItemToCart = e => {
    const { dispatch } = this.props;
    const itemId = parseInt(e.target.id);
    if (!isNaN(itemId)) {
      dispatch(addToCart(itemId));
    }
  };

  changeSortDirection = sortDirection => {
    this.setState(
      { sortDirection: sortDirection, pageIndex: 1 },
      this.getProducts
    );
  };

  changeSelectedSize = filterBySize => {
    this.setState(
      { filterBySize: filterBySize, pageIndex: 1 },
      this.getProducts
    );
  };

  getContainer() {
    return document.querySelector("#modal");
  }

  renderProduct() {
    const products = this.props.products;
    if (products.isFetching) {
      return (
        <Modal getContainer={this.getContainer}>
          <Loader size="large" />
        </Modal>
      );
    } else {
      if (products.error) {
        return <Error message={products.error} />;
      } else {
        return (
          <ItemList
            products={this.props.products}
            items={this.props.cart.items}
            changePage={this.changePage}
            addItemToCart={this.addItemToCart}
          />
        );
      }
    }
  }

  render() {
    return (
      <Fragment>
        <div className="row">
          <div className="column">
            <Link to="/cart" style={{ float: "right" }}>
              <span className={`ui large ${this.context.theme} basic label`}>
                <i className="shop icon" /> Cart ({this.props.cart.items.length}
                )
              </span>
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="four wide column">
            <div className="">
              <FilterAndSorter
                changeSortDirection={this.changeSortDirection}
                sortDirection={this.state.sortDirection}
                filterBySize={this.state.filterBySize}
                changeSelectedSize={this.changeSelectedSize}
              />
            </div>
          </div>
          <div className="twelve wide column">{this.renderProduct()}</div>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products,
    cart: state.cart
  };
}
export default connect(mapStateToProps)(Product);
