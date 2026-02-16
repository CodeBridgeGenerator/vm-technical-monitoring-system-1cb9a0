import React from "react";
import { render, screen } from "@testing-library/react";

import SupervisorChecklistsEditDialogComponent from "../SupervisorChecklistsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders supervisorChecklists edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <SupervisorChecklistsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("supervisorChecklists-edit-dialog-component")).toBeInTheDocument();
});
