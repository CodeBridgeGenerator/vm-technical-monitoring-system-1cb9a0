import React from "react";
import { render, screen } from "@testing-library/react";

import WorkflowServicesCreateDialogComponent from "../WorkflowServicesCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders workflowServices create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <WorkflowServicesCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("workflowServices-create-dialog-component")).toBeInTheDocument();
});
