import React from "react";
import { render, screen } from "@testing-library/react";

import CustomerSalesOrdersPage from "../CustomerSalesOrdersPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders customerSalesOrders page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CustomerSalesOrdersPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("customerSalesOrders-datatable")).toBeInTheDocument();
    expect(screen.getByRole("customerSalesOrders-add-button")).toBeInTheDocument();
});
