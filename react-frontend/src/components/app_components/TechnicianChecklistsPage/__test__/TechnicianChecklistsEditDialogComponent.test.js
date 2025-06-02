import React from "react";
import { render, screen } from "@testing-library/react";

import TechnicianChecklistsEditDialogComponent from "../TechnicianChecklistsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders technicianChecklists edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TechnicianChecklistsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("technicianChecklists-edit-dialog-component")).toBeInTheDocument();
});
