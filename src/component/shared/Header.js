import React from "react";
import { Link } from "react-router-dom";
import ThemeContext from "../../context/ThemeContext";

const Header = props => {
  return (
    <ThemeContext.Consumer>
      {value => (
        <div className={`${value.theme} row`}>
          <div className="twelve wide column">
            <div className="ui small image">
              <Link to="/" className="">
                <img
                  src="https://www.dummysolutions.com/dshosting/assets/img/logo.png"
                  alt="Dummy Solution"
                />
              </Link>
            </div>
          </div>
          <div className="two wide column" />
          <div className="two wide column">
            <select
              onChange={e => {
                value.onThemeChange(e.target.value);
              }}
              className={`ui dropdown large ${value.theme} label`}>
              <option value="yellow">Theme - Yellow</option>
              <option value="olive">Theme - Olive</option>
              <option value="orange">Theme - Orange</option>
              <option value="pink">Theme - Pink</option>
            </select>
          </div>
        </div>
      )}
    </ThemeContext.Consumer>
  );
};

export default Header;
