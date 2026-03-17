import React from "react";
import { render, screen } from "@testing-library/react";

import IncomingMachineChecklistsEditDialogComponent from "../IncomingMachineChecklistsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders incomingMachineChecklists edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <IncomingMachineChecklistsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("incomingMachineChecklists-edit-dialog-component")).toBeInTheDocument();
});
