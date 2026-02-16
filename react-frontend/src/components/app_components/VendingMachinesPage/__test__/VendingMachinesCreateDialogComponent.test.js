import React from "react";
import { render, screen } from "@testing-library/react";

import VendingMachinesCreateDialogComponent from "../VendingMachinesCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders vendingMachines create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <VendingMachinesCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("vendingMachines-create-dialog-component")).toBeInTheDocument();
});
