import React from "react";
import { render, screen } from "@testing-library/react";

import IrmsQuotationsPage from "../IrmsQuotationsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders irmsQuotations page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <IrmsQuotationsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("irmsQuotations-datatable")).toBeInTheDocument();
    expect(screen.getByRole("irmsQuotations-add-button")).toBeInTheDocument();
});
