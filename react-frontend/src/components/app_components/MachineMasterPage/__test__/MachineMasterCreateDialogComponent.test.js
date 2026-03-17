import React from "react";
import { render, screen } from "@testing-library/react";

import MachineMasterCreateDialogComponent from "../MachineMasterCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders machineMaster create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MachineMasterCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("machineMaster-create-dialog-component")).toBeInTheDocument();
});
