import React from "react";
import { render, screen } from "@testing-library/react";

import PurchaseOrderItemsEditDialogComponent from "../PurchaseOrderItemsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders purchaseOrderItems edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PurchaseOrderItemsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("purchaseOrderItems-edit-dialog-component")).toBeInTheDocument();
});
