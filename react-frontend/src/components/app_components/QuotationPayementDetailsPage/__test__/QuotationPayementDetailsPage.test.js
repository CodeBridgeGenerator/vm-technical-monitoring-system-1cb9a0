import React from "react";
import { render, screen } from "@testing-library/react";

import QuotationPayementDetailsPage from "../QuotationPayementDetailsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders quotationPayementDetails page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <QuotationPayementDetailsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("quotationPayementDetails-datatable")).toBeInTheDocument();
    expect(screen.getByRole("quotationPayementDetails-add-button")).toBeInTheDocument();
});
