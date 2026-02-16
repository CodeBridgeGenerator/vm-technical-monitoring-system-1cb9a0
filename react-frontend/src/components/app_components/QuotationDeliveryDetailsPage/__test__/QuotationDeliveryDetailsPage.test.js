import React from "react";
import { render, screen } from "@testing-library/react";

import QuotationDeliveryDetailsPage from "../QuotationDeliveryDetailsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders quotationDeliveryDetails page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <QuotationDeliveryDetailsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("quotationDeliveryDetails-datatable")).toBeInTheDocument();
    expect(screen.getByRole("quotationDeliveryDetails-add-button")).toBeInTheDocument();
});
