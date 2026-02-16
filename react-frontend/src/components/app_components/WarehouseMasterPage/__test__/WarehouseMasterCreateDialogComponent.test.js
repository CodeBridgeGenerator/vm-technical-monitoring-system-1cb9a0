import React from "react";
import { render, screen } from "@testing-library/react";

import WarehouseMasterCreateDialogComponent from "../WarehouseMasterCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders warehouseMaster create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <WarehouseMasterCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("warehouseMaster-create-dialog-component")).toBeInTheDocument();
});
