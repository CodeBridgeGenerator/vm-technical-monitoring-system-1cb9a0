import React from "react";
import { render, screen } from "@testing-library/react";

import IncomingMachineAbortHistoryCreateDialogComponent from "../IncomingMachineAbortHistoryCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders incomingMachineAbortHistory create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <IncomingMachineAbortHistoryCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("incomingMachineAbortHistory-create-dialog-component")).toBeInTheDocument();
});
