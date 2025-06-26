import React from "react";
import { render, screen } from "@testing-library/react";

import IrmsDeliveryOrdersPage from "../IrmsDeliveryOrdersPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders irmsDeliveryOrders page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <IrmsDeliveryOrdersPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("irmsDeliveryOrders-datatable")).toBeInTheDocument();
    expect(screen.getByRole("irmsDeliveryOrders-add-button")).toBeInTheDocument();
});
