import React from "react";
import { render, screen } from "@testing-library/react";

import CustomerSalesOrdersCreateDialogComponent from "../CustomerSalesOrdersCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders customerSalesOrders create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CustomerSalesOrdersCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("customerSalesOrders-create-dialog-component")).toBeInTheDocument();
});
