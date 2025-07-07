import React from "react";
import { render, screen } from "@testing-library/react";

import IncomingMachineChecklistsPage from "../IncomingMachineChecklistsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders incomingMachineChecklists page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <IncomingMachineChecklistsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("incomingMachineChecklists-datatable")).toBeInTheDocument();
    expect(screen.getByRole("incomingMachineChecklists-add-button")).toBeInTheDocument();
});
