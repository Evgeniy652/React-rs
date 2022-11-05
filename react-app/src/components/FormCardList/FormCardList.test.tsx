import { render, cleanup } from "@testing-library/react";
import "../../setupTests";

import React from "react";
import FormCardList from "./FormCardList";

describe("FormCardList component", () => {
  beforeEach(cleanup);

  test("should render 2 cards according to data", async () => {
    const component = render(
      <FormCardList
        list={[
          {
            id: "1",
            name: "Dart Vader",
            status: "Alive",
            species: ["horrid", "lovely"],
            createdDate: "10/06/2022",
            gender: "Male",
            file: null,
          },
          {
            id: "2",
            name: " Natan Drake",
            status: "Alive",
            species: ["lovely"],
            createdDate: "10/06/2022",
            gender: "Male",
            file: null,
          },
        ]}
      />
    );
    const cards = component.queryAllByRole("form-card");

    expect(cards.length).toBe(2);
  });
});
