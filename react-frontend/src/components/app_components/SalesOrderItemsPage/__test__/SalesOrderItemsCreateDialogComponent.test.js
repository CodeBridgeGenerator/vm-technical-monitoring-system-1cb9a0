import React from "react";
import { render, screen } from "@testing-library/react";

import SalesOrderItemsCreateDialogComponent from "../SalesOrderItemsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders salesOrderItems create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <SalesOrderItemsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("salesOrderItems-create-dialog-component")).toBeInTheDocument();
});
