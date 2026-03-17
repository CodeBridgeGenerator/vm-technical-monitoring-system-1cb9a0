import React from "react";
import { render, screen } from "@testing-library/react";

import ExternalTicketsEditDialogComponent from "../ExternalTicketsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders externalTickets edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ExternalTicketsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("externalTickets-edit-dialog-component")).toBeInTheDocument();
});
