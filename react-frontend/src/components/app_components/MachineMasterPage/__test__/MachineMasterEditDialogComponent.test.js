import React from "react";
import { render, screen } from "@testing-library/react";

import MachineMasterEditDialogComponent from "../MachineMasterEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders machineMaster edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MachineMasterEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("machineMaster-edit-dialog-component")).toBeInTheDocument();
});
