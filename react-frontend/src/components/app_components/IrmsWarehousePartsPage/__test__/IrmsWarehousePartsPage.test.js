import React from "react";
import { render, screen } from "@testing-library/react";

import IrmsWarehousePartsPage from "../IrmsWarehousePartsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders irmsWarehouseParts page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <IrmsWarehousePartsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("irmsWarehouseParts-datatable")).toBeInTheDocument();
    expect(screen.getByRole("irmsWarehouseParts-add-button")).toBeInTheDocument();
});
