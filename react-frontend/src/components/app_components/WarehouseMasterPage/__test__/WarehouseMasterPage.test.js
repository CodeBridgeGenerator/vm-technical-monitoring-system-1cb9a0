import React from "react";
import { render, screen } from "@testing-library/react";

import WarehouseMasterPage from "../WarehouseMasterPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders warehouseMaster page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <WarehouseMasterPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("warehouseMaster-datatable")).toBeInTheDocument();
    expect(screen.getByRole("warehouseMaster-add-button")).toBeInTheDocument();
});
