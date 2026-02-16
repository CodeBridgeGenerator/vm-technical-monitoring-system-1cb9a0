import React from "react";
import { render, screen } from "@testing-library/react";

import ExternalChecksPage from "../ExternalChecksPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders externalChecks page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ExternalChecksPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("externalChecks-datatable")).toBeInTheDocument();
    expect(screen.getByRole("externalChecks-add-button")).toBeInTheDocument();
});
