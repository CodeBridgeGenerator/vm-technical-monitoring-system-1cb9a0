import React from "react";
import { render, screen } from "@testing-library/react";

import StockOutDetailsPage from "../StockOutDetailsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders stockOutDetails page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <StockOutDetailsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("stockOutDetails-datatable")).toBeInTheDocument();
    expect(screen.getByRole("stockOutDetails-add-button")).toBeInTheDocument();
});
