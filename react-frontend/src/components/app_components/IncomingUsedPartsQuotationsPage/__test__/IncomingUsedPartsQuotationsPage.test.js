import React from "react";
import { render, screen } from "@testing-library/react";

import IncomingUsedPartsQuotationsPage from "../IncomingUsedPartsQuotationsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders incomingUsedPartsQuotations page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <IncomingUsedPartsQuotationsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("incomingUsedPartsQuotations-datatable")).toBeInTheDocument();
    expect(screen.getByRole("incomingUsedPartsQuotations-add-button")).toBeInTheDocument();
});
