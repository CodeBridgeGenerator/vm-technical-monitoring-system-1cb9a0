import React from "react";
import { render, screen } from "@testing-library/react";

import VendingMachinesEditDialogComponent from "../VendingMachinesEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders vendingMachines edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <VendingMachinesEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("vendingMachines-edit-dialog-component")).toBeInTheDocument();
});
