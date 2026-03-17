import React from "react";
import { render, screen } from "@testing-library/react";

import MemStockOutDetailsEditDialogComponent from "../MemStockOutDetailsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders memStockOutDetails edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MemStockOutDetailsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("memStockOutDetails-edit-dialog-component")).toBeInTheDocument();
});
