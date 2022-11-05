import { render, cleanup } from "@testing-library/react";
import React from "react";
import Modal from "./Modal";

describe("Modal component", () => {
  beforeEach(cleanup);

  test("should render child", async () => {
    const text = "Hello world";
    document.body.insertAdjacentHTML(
      "beforeend",
      '<div id="modal-root"></div>'
    );

    render(<Modal>{text}</Modal>);

    const modalRoot = document.querySelector("#modal-root");
    expect(modalRoot.textContent).toBe(text);
  });
});
