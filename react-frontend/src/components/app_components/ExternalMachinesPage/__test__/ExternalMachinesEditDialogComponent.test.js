import React from "react";
import { render, screen } from "@testing-library/react";

import ExternalMachinesEditDialogComponent from "../ExternalMachinesEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders externalMachines edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ExternalMachinesEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("externalMachines-edit-dialog-component")).toBeInTheDocument();
});
