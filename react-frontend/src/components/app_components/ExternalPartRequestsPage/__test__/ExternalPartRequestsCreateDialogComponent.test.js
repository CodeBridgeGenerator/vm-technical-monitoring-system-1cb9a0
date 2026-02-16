import React from "react";
import { render, screen } from "@testing-library/react";

import ExternalPartRequestsCreateDialogComponent from "../ExternalPartRequestsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders externalPartRequests create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ExternalPartRequestsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("externalPartRequests-create-dialog-component")).toBeInTheDocument();
});
