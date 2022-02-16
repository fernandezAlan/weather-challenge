import { render, cleanup, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";
import Home from "../../views/Home/Home";
import Error from "../../views/Error/Error";
import { act } from "react-dom/test-utils";
import {
  MemoryRouter,
} from "react-router-dom";


jest.mock("../../views/Home/Home");
jest.mock("../../views/Error/Error");

test('should render Home component in the route "/"',async () => {
  Home.mockImplementation(() => <>homeMock</>);

  await act(async () =>
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )
  );

  expect(screen.getByText("homeMock")).toBeInTheDocument();
});

test('should render Error component in the route "/error"',async () => {
    Error.mockImplementation(() => <>ErrorMock</>);

    await act(async () =>
      render(
        <MemoryRouter initialEntries={['/error']}>
          <App />
        </MemoryRouter>
      )
    );
  
    expect(screen.getByText("ErrorMock")).toBeInTheDocument();
  });