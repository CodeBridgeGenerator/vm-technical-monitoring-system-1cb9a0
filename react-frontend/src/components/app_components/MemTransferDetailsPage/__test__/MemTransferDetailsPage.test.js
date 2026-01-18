import React from "react";
import { render, screen } from "@testing-library/react";

import MemTransferDetailsPage from "../MemTransferDetailsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders memTransferDetails page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MemTransferDetailsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("memTransferDetails-datatable")).toBeInTheDocument();
    expect(screen.getByRole("memTransferDetails-add-button")).toBeInTheDocument();
});
