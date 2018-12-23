import React from "react";
import { shallow } from "enzyme";

import FilterAndSorter from "../FilterAndSorter";

it("checks buttons", () => {
  const wrapped = shallow(<FilterAndSorter />, {
    Consumer: { theme: "orange" }
  });
  expect(wrapped.find("button").length);
});
