import React from "react";
import { render, screen } from "@testing-library/react";

import WarantyPeriodDetailsPage from "../WarantyPeriodDetailsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders warantyPeriodDetails page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <WarantyPeriodDetailsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("warantyPeriodDetails-datatable")).toBeInTheDocument();
    expect(screen.getByRole("warantyPeriodDetails-add-button")).toBeInTheDocument();
});
