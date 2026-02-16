import React from "react";
import { render, screen } from "@testing-library/react";

import QuotationDeliveryDetailsEditDialogComponent from "../QuotationDeliveryDetailsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders quotationDeliveryDetails edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <QuotationDeliveryDetailsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("quotationDeliveryDetails-edit-dialog-component")).toBeInTheDocument();
});
