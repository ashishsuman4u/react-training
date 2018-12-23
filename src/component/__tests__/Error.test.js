import React from "react";
import { shallow } from "enzyme";
import Error from "../Error";

it("shows a error", () => {
  const wrapped = shallow(<Error message="test" />);

  expect(wrapped.html()).toContain(
    "Sorry we are getting test error from server"
  );
});
