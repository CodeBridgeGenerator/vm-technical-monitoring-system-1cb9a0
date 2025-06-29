import React from "react";
import { render, screen } from "@testing-library/react";

import IrmsWarehousePartsCreateDialogComponent from "../IrmsWarehousePartsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders irmsWarehouseParts create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <IrmsWarehousePartsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("irmsWarehouseParts-create-dialog-component")).toBeInTheDocument();
});
