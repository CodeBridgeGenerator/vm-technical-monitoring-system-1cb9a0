import React from "react";
import { render, screen } from "@testing-library/react";

import MemTransferItemsPage from "../MemTransferItemsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders memTransferItems page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MemTransferItemsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("memTransferItems-datatable")).toBeInTheDocument();
    expect(screen.getByRole("memTransferItems-add-button")).toBeInTheDocument();
});
