import React from "react";
import { render, screen } from "@testing-library/react";

import MemWarehousePartsEditDialogComponent from "../MemWarehousePartsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders memWarehouseParts edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MemWarehousePartsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("memWarehouseParts-edit-dialog-component")).toBeInTheDocument();
});
