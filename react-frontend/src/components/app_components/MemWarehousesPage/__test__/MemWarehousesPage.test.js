import React from "react";
import { render, screen } from "@testing-library/react";

import MemWarehousesPage from "../MemWarehousesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders memWarehouses page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MemWarehousesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("memWarehouses-datatable")).toBeInTheDocument();
    expect(screen.getByRole("memWarehouses-add-button")).toBeInTheDocument();
});
