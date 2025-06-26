import React from "react";
import { render, screen } from "@testing-library/react";

import IncomingMachineAbortHistoryEditDialogComponent from "../IncomingMachineAbortHistoryEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders incomingMachineAbortHistory edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <IncomingMachineAbortHistoryEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("incomingMachineAbortHistory-edit-dialog-component")).toBeInTheDocument();
});
