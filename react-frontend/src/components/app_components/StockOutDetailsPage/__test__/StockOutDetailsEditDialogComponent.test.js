import React from "react";
import { render, screen } from "@testing-library/react";

import StockOutDetailsEditDialogComponent from "../StockOutDetailsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders stockOutDetails edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <StockOutDetailsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("stockOutDetails-edit-dialog-component")).toBeInTheDocument();
});
