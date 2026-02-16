import React from "react";
import { render, screen } from "@testing-library/react";

import IrmsWarehousePartsEditDialogComponent from "../IrmsWarehousePartsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders irmsWarehouseParts edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <IrmsWarehousePartsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("irmsWarehouseParts-edit-dialog-component")).toBeInTheDocument();
});
