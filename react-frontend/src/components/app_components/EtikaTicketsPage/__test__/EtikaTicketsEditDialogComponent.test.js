import React from "react";
import { render, screen } from "@testing-library/react";

import EtikaTicketsEditDialogComponent from "../EtikaTicketsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders etikaTickets edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <EtikaTicketsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("etikaTickets-edit-dialog-component")).toBeInTheDocument();
});
