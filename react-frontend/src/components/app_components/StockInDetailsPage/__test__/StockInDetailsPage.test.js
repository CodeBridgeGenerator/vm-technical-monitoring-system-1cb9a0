import React from "react";
import { render, screen } from "@testing-library/react";

import StockInDetailsPage from "../StockInDetailsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders stockInDetails page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <StockInDetailsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("stockInDetails-datatable")).toBeInTheDocument();
    expect(screen.getByRole("stockInDetails-add-button")).toBeInTheDocument();
});
