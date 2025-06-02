import React from "react";
import { render, screen } from "@testing-library/react";

import ExternalChecklistsCreateDialogComponent from "../ExternalChecklistsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders externalChecklists create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ExternalChecklistsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("externalChecklists-create-dialog-component")).toBeInTheDocument();
});
