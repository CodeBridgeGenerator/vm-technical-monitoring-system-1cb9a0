import React from "react";
import { render, screen } from "@testing-library/react";

import ExternalMachinesPage from "../ExternalMachinesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders externalMachines page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ExternalMachinesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("externalMachines-datatable")).toBeInTheDocument();
    expect(screen.getByRole("externalMachines-add-button")).toBeInTheDocument();
});
