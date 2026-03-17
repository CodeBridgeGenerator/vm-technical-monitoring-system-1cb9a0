import React from "react";
import { render, screen } from "@testing-library/react";

import MemWarehousePartsCreateDialogComponent from "../MemWarehousePartsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders memWarehouseParts create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MemWarehousePartsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("memWarehouseParts-create-dialog-component")).toBeInTheDocument();
});
