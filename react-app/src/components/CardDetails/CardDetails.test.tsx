import { render, cleanup } from "@testing-library/react";
import "../../setupTests";

import React from "react";

import { ApiResult_I } from "../../common/interfaces/api.interface";
import CardDetails from "./CardDetails";

describe("CardDetails component", () => {
  beforeEach(cleanup);

  test("should render card with mock data", () => {
    const user: ApiResult_I = {
      id: 1,
      name: "Rick Sanchez",
      status: "Alive",
      species: "Human",
      type: "",
      gender: "Male",
      origin: {
        name: "Earth (C-137)",
        url: "https://rickandmortyapi.com/api/location/1",
      },
      location: {
        name: "Citadel of Ricks",
        url: "https://rickandmortyapi.com/api/location/3",
      },
      image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      episode: [],
      url: "https://rickandmortyapi.com/api/character/1",
      created: "2017-11-04T18:48:46.250Z",
    };

    const component = render(<CardDetails element={user} />);
    const rick = component.queryByText("Rick Sanchez");
    const gender = component.queryByText("Male");
    const status = component.queryByText("Alive");

    expect(rick).toBeVisible();
    expect(gender).toBeVisible();
    expect(status).toBeVisible();
  });
});
