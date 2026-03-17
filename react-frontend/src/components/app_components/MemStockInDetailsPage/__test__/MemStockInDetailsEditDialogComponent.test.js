import React from "react";
import { render, screen } from "@testing-library/react";

import MemStockInDetailsEditDialogComponent from "../MemStockInDetailsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders memStockInDetails edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MemStockInDetailsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("memStockInDetails-edit-dialog-component")).toBeInTheDocument();
});
