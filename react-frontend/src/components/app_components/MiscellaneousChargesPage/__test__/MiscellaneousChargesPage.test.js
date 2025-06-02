import React from "react";
import { render, screen } from "@testing-library/react";

import MiscellaneousChargesPage from "../MiscellaneousChargesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders miscellaneousCharges page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MiscellaneousChargesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("miscellaneousCharges-datatable")).toBeInTheDocument();
    expect(screen.getByRole("miscellaneousCharges-add-button")).toBeInTheDocument();
});
