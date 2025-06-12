import React from "react";
import { render, screen } from "@testing-library/react";

import IrmsDeliveryOrdersCreateDialogComponent from "../IrmsDeliveryOrdersCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders irmsDeliveryOrders create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <IrmsDeliveryOrdersCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("irmsDeliveryOrders-create-dialog-component")).toBeInTheDocument();
});
