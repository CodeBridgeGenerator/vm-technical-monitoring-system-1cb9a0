import React from "react";
import { render, screen } from "@testing-library/react";

import CustomerPurchaseOrdersPage from "../CustomerPurchaseOrdersPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders customerPurchaseOrders page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CustomerPurchaseOrdersPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("customerPurchaseOrders-datatable")).toBeInTheDocument();
    expect(screen.getByRole("customerPurchaseOrders-add-button")).toBeInTheDocument();
});
