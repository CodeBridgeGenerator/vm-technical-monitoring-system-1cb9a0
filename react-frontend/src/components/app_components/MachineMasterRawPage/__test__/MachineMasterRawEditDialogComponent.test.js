import React from "react";
import { render, screen } from "@testing-library/react";

import MachineMasterRawEditDialogComponent from "../MachineMasterRawEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders machineMasterRaw edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MachineMasterRawEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("machineMasterRaw-edit-dialog-component")).toBeInTheDocument();
});
