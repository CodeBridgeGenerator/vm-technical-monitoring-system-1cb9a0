import React from "react";
import { render, screen } from "@testing-library/react";

import MemWarehousePartsPage from "../MemWarehousePartsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders memWarehouseParts page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MemWarehousePartsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("memWarehouseParts-datatable")).toBeInTheDocument();
    expect(screen.getByRole("memWarehouseParts-add-button")).toBeInTheDocument();
});
