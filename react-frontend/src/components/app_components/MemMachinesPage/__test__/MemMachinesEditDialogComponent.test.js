import React from "react";
import { render, screen } from "@testing-library/react";

import MemMachinesEditDialogComponent from "../MemMachinesEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders memMachines edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MemMachinesEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("memMachines-edit-dialog-component")).toBeInTheDocument();
});
