import React from "react";
import { render, screen } from "@testing-library/react";

import DeliveryOrderItemsCreateDialogComponent from "../DeliveryOrderItemsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders deliveryOrderItems create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DeliveryOrderItemsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("deliveryOrderItems-create-dialog-component")).toBeInTheDocument();
});
