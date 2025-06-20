import React from "react";
import { render, screen } from "@testing-library/react";

import DeliveryOrderItemsPage from "../DeliveryOrderItemsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders deliveryOrderItems page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DeliveryOrderItemsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("deliveryOrderItems-datatable")).toBeInTheDocument();
    expect(screen.getByRole("deliveryOrderItems-add-button")).toBeInTheDocument();
});
