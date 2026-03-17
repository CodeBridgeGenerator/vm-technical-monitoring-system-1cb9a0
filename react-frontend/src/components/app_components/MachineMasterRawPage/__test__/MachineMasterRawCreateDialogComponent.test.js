import React from "react";
import { render, screen } from "@testing-library/react";

import MachineMasterRawCreateDialogComponent from "../MachineMasterRawCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders machineMasterRaw create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MachineMasterRawCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("machineMasterRaw-create-dialog-component")).toBeInTheDocument();
});
