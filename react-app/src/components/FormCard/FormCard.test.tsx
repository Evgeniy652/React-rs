import { render, cleanup } from "@testing-library/react";
import "../../setupTests";

import React from "react";
import FormCard from "./FormCard";
import { FormCard_I } from "../../common/interfaces/own-card.interface";

describe("FormCard component", () => {
  beforeEach(cleanup);

  test("should render form card with mock data", () => {
    const user: FormCard_I = {
      id: "1",
      name: "Dart Vader",
      status: "Alive",
      species: ["horrid", "lovely"],
      createdDate: "10/06/2022",
      gender: "Male",
      file: null,
    };

    const component = render(<FormCard role="form-card" element={user} />);
    const rick = component.queryByText("Dart Vader");

    expect(rick).toBeVisible();
  });
});
