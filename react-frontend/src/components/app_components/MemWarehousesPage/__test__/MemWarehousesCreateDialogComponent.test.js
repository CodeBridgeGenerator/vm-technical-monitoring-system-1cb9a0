import React from "react";
import { render, screen } from "@testing-library/react";

import MemWarehousesCreateDialogComponent from "../MemWarehousesCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders memWarehouses create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MemWarehousesCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("memWarehouses-create-dialog-component")).toBeInTheDocument();
});
