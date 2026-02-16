import React from "react";
import { render, screen } from "@testing-library/react";

import IncomingMachineTicketsPage from "../IncomingMachineTicketsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders incomingMachineTickets page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <IncomingMachineTicketsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("incomingMachineTickets-datatable")).toBeInTheDocument();
    expect(screen.getByRole("incomingMachineTickets-add-button")).toBeInTheDocument();
});
