import React from "react";
import { render, screen } from "@testing-library/react";

import VendingMachinesPage from "../VendingMachinesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders vendingMachines page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <VendingMachinesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("vendingMachines-datatable")).toBeInTheDocument();
    expect(screen.getByRole("vendingMachines-add-button")).toBeInTheDocument();
});
