import React from "react";
import { render, screen } from "@testing-library/react";

import SupervisorChecklistsCreateDialogComponent from "../SupervisorChecklistsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders supervisorChecklists create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <SupervisorChecklistsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("supervisorChecklists-create-dialog-component")).toBeInTheDocument();
});
