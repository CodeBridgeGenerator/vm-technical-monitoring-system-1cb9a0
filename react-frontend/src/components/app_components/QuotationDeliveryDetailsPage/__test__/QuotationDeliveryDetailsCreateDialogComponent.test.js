import React from "react";
import { render, screen } from "@testing-library/react";

import QuotationDeliveryDetailsCreateDialogComponent from "../QuotationDeliveryDetailsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders quotationDeliveryDetails create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <QuotationDeliveryDetailsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("quotationDeliveryDetails-create-dialog-component")).toBeInTheDocument();
});
