import React from "react";
import { render, screen } from "@testing-library/react";

import EtikaTicketsCreateDialogComponent from "../EtikaTicketsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders etikaTickets create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <EtikaTicketsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("etikaTickets-create-dialog-component")).toBeInTheDocument();
});
