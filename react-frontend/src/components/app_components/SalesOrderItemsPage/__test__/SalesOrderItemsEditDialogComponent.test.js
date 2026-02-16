import React from "react";
import { render, screen } from "@testing-library/react";

import SalesOrderItemsEditDialogComponent from "../SalesOrderItemsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders salesOrderItems edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <SalesOrderItemsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("salesOrderItems-edit-dialog-component")).toBeInTheDocument();
});
