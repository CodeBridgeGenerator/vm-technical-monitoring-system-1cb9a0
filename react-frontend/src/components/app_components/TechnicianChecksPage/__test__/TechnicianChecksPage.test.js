import React from "react";
import { render, screen } from "@testing-library/react";

import TechnicianChecksPage from "../TechnicianChecksPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders technicianChecks page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TechnicianChecksPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("technicianChecks-datatable")).toBeInTheDocument();
    expect(screen.getByRole("technicianChecks-add-button")).toBeInTheDocument();
});
