import { render, cleanup } from "@testing-library/react";
import "../../setupTests";
import pretty from "pretty";

import React from "react";
import Header from "./Header";
import { MemoryRouter } from "react-router-dom";

describe("Header component", () => {
  beforeEach(cleanup);

  test("should render header", () => {
    const { container } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
      "<header>
        <h1>The Rick and Morty</h1>
        <div>Position: /</div>
        <ul>
          <li><a class=\\"\\" href=\\"/home\\">Home</a></li>
          <li><a class=\\"\\" href=\\"/about\\">About</a></li>
          <li><a class=\\"\\" href=\\"/form\\">Form</a></li>
        </ul>
      </header>"
    `);
  });
});
