import React from "react";
import { render, screen } from "@testing-library/react";

import ExternalChecklistsEditDialogComponent from "../ExternalChecklistsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders externalChecklists edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ExternalChecklistsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("externalChecklists-edit-dialog-component")).toBeInTheDocument();
});
