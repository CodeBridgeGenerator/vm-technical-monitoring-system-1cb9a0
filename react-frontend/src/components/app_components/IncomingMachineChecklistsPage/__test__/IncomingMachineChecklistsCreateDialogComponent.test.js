import React from "react";
import { render, screen } from "@testing-library/react";

import IncomingMachineChecklistsCreateDialogComponent from "../IncomingMachineChecklistsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders incomingMachineChecklists create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <IncomingMachineChecklistsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("incomingMachineChecklists-create-dialog-component")).toBeInTheDocument();
});
