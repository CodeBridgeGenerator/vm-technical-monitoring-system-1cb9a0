import React from "react";
import { render, screen } from "@testing-library/react";

import ExternalTicketsPage from "../ExternalTicketsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders externalTickets page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ExternalTicketsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("externalTickets-datatable")).toBeInTheDocument();
    expect(screen.getByRole("externalTickets-add-button")).toBeInTheDocument();
});
