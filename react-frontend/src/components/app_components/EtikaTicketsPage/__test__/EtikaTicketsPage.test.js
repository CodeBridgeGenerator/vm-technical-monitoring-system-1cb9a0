import React from "react";
import { render, screen } from "@testing-library/react";

import EtikaTicketsPage from "../EtikaTicketsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders etikaTickets page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <EtikaTicketsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("etikaTickets-datatable")).toBeInTheDocument();
    expect(screen.getByRole("etikaTickets-add-button")).toBeInTheDocument();
});
