import React from "react";
import { render, screen } from "@testing-library/react";

import MemStockOutDetailsCreateDialogComponent from "../MemStockOutDetailsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders memStockOutDetails create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MemStockOutDetailsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("memStockOutDetails-create-dialog-component")).toBeInTheDocument();
});
