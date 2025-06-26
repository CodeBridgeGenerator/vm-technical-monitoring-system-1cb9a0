import React from "react";
import { render, screen } from "@testing-library/react";

import IrmsDeliveryOrdersEditDialogComponent from "../IrmsDeliveryOrdersEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders irmsDeliveryOrders edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <IrmsDeliveryOrdersEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("irmsDeliveryOrders-edit-dialog-component")).toBeInTheDocument();
});
