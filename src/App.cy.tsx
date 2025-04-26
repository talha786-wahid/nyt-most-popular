import App from "./App";
import { mount } from "cypress/react";

describe("<App />", () => {
  it("renders", () => {
    mount(<App />);
  });
});
