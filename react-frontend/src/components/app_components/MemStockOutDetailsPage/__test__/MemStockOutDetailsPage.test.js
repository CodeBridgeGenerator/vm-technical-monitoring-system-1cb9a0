import React from "react";
import { render, screen } from "@testing-library/react";

import MemStockOutDetailsPage from "../MemStockOutDetailsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders memStockOutDetails page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MemStockOutDetailsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("memStockOutDetails-datatable")).toBeInTheDocument();
    expect(screen.getByRole("memStockOutDetails-add-button")).toBeInTheDocument();
});
