import React from "react";
import { render, screen } from "@testing-library/react";

import TransferDetailsPage from "../TransferDetailsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders transferDetails page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TransferDetailsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("transferDetails-datatable")).toBeInTheDocument();
    expect(screen.getByRole("transferDetails-add-button")).toBeInTheDocument();
});
