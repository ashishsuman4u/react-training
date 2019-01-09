import React from "react";
import { mount } from "enzyme";
import { BrowserRouter } from "react-router-dom";

import Store from "../../store";
import Products from "../Products";
import FilterAndSorter from "../../component/FilterAndSorter";
import { ThemeStore } from "../../context/ThemeContext";

it("should contain Filters and Sorter", () => {
  const themeContext = { theme: "orange" };
  const wrapped = mount(
    <Store>
      <ThemeStore>
        <BrowserRouter>
          <Products />
        </BrowserRouter>
      </ThemeStore>
    </Store>,
    { context: { themeContext } }
  );
  expect(wrapped.find(FilterAndSorter).length).toEqual(1);
  wrapped.unmount();
});
