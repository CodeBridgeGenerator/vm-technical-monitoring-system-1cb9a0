import React from "react";
import { render, screen } from "@testing-library/react";

import PartsMasterPage from "../PartsMasterPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders partsMaster page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PartsMasterPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("partsMaster-datatable")).toBeInTheDocument();
    expect(screen.getByRole("partsMaster-add-button")).toBeInTheDocument();
});
