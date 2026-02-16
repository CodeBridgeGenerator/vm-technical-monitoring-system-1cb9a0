import React from "react";
import { render, screen } from "@testing-library/react";

import TechnicianChecklistsCreateDialogComponent from "../TechnicianChecklistsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders technicianChecklists create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TechnicianChecklistsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("technicianChecklists-create-dialog-component")).toBeInTheDocument();
});
