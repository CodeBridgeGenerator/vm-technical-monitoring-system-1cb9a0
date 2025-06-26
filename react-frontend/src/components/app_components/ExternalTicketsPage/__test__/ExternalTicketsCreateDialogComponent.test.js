import React from "react";
import { render, screen } from "@testing-library/react";

import ExternalTicketsCreateDialogComponent from "../ExternalTicketsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders externalTickets create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ExternalTicketsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("externalTickets-create-dialog-component")).toBeInTheDocument();
});
