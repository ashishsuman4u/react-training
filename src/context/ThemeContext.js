import React, { Component } from "react";

const Context = React.createContext();

export class ThemeStore extends Component {
  state = { theme: "yellow" };

  onThemeChange = theme => {
    this.setState({ theme });
  };

  render() {
    return (
      <Context.Provider
        value={{ ...this.state, onThemeChange: this.onThemeChange }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;
