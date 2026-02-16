import React from "react";
import { render, screen } from "@testing-library/react";

import IncomingMachineTicketsCreateDialogComponent from "../IncomingMachineTicketsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders incomingMachineTickets create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <IncomingMachineTicketsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("incomingMachineTickets-create-dialog-component")).toBeInTheDocument();
});
