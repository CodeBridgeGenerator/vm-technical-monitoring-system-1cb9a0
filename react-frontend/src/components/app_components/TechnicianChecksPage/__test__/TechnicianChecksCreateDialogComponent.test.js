import React from "react";
import { render, screen } from "@testing-library/react";

import TechnicianChecksCreateDialogComponent from "../TechnicianChecksCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders technicianChecks create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TechnicianChecksCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("technicianChecks-create-dialog-component")).toBeInTheDocument();
});
