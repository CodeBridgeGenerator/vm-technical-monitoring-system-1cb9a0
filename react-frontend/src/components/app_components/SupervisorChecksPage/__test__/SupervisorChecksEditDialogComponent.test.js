import React from "react";
import { render, screen } from "@testing-library/react";

import SupervisorChecksEditDialogComponent from "../SupervisorChecksEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders supervisorChecks edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <SupervisorChecksEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("supervisorChecks-edit-dialog-component")).toBeInTheDocument();
});
