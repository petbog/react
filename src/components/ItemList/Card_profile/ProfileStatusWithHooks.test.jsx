import React from "react";
import { create } from "react-test-renderer";

describe("Button component", () => {
  test("Matches the snapshot", () => {
    const button = create(<Button />);
    expect(button.toJSON()).toMatchSnapshot();
  });
});

//https://www.valentinog.com/blog/testing-react/ 17:00