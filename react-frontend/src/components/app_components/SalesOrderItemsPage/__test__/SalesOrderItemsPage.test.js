import React from "react";
import { render, screen } from "@testing-library/react";

import SalesOrderItemsPage from "../SalesOrderItemsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders salesOrderItems page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <SalesOrderItemsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("salesOrderItems-datatable")).toBeInTheDocument();
    expect(screen.getByRole("salesOrderItems-add-button")).toBeInTheDocument();
});
