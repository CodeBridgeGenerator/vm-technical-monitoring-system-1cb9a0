import React from "react";
import { render, screen } from "@testing-library/react";

import WorkflowServicesEditDialogComponent from "../WorkflowServicesEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders workflowServices edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <WorkflowServicesEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("workflowServices-edit-dialog-component")).toBeInTheDocument();
});
