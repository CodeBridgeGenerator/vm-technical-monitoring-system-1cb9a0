import React from "react";
import { render, screen } from "@testing-library/react";

import TransferItemsPage from "../TransferItemsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders transferItems page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TransferItemsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("transferItems-datatable")).toBeInTheDocument();
    expect(screen.getByRole("transferItems-add-button")).toBeInTheDocument();
});
