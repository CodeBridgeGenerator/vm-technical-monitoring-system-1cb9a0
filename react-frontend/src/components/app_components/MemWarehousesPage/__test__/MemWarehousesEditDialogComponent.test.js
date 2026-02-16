import React from "react";
import { render, screen } from "@testing-library/react";

import MemWarehousesEditDialogComponent from "../MemWarehousesEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders memWarehouses edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MemWarehousesEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("memWarehouses-edit-dialog-component")).toBeInTheDocument();
});
