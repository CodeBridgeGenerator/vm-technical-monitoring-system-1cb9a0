import React from "react";
import { render, screen } from "@testing-library/react";

import MiscellaneousChargesCreateDialogComponent from "../MiscellaneousChargesCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders miscellaneousCharges create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MiscellaneousChargesCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("miscellaneousCharges-create-dialog-component")).toBeInTheDocument();
});
