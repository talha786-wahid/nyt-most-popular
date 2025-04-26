import React, { ReactNode } from "react";
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { expect, afterEach } from "vitest";
import { render as rtlRender, RenderResult } from "@testing-library/react";
import { TestWrapper } from "./TestWrapper";

// Extend Vitest's expect method with methods from jest-dom
expect.extend(matchers);

// Cleanup after each test case
afterEach(() => {
  cleanup();
});

function Wrapper({
  children,
  route = "/",
}: {
  children: ReactNode;
  route?: string;
}) {
  return <TestWrapper route={route}>{children}</TestWrapper>;
}

export const render = (
  ui: React.ReactElement,
  { route = "/" } = {}
): RenderResult => {
  return rtlRender(ui, {
    wrapper: (props) => <Wrapper {...props} route={route} />,
  });
};

export * from "@testing-library/react";
