import React from "react";
import { render, screen } from "@testing-library/react";

import IncomingMachineTicketsEditDialogComponent from "../IncomingMachineTicketsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders incomingMachineTickets edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <IncomingMachineTicketsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("incomingMachineTickets-edit-dialog-component")).toBeInTheDocument();
});
