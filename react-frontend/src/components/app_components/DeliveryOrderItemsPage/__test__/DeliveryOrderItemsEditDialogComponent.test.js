import React from "react";
import { render, screen } from "@testing-library/react";

import DeliveryOrderItemsEditDialogComponent from "../DeliveryOrderItemsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders deliveryOrderItems edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DeliveryOrderItemsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("deliveryOrderItems-edit-dialog-component")).toBeInTheDocument();
});
