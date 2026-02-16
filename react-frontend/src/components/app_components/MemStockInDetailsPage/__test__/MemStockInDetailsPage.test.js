import React from "react";
import { render, screen } from "@testing-library/react";

import MemStockInDetailsPage from "../MemStockInDetailsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders memStockInDetails page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MemStockInDetailsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("memStockInDetails-datatable")).toBeInTheDocument();
    expect(screen.getByRole("memStockInDetails-add-button")).toBeInTheDocument();
});
