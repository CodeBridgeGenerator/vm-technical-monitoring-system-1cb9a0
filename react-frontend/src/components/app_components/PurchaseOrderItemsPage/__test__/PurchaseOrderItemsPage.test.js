import React from "react";
import { render, screen } from "@testing-library/react";

import PurchaseOrderItemsPage from "../PurchaseOrderItemsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders purchaseOrderItems page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PurchaseOrderItemsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("purchaseOrderItems-datatable")).toBeInTheDocument();
    expect(screen.getByRole("purchaseOrderItems-add-button")).toBeInTheDocument();
});
