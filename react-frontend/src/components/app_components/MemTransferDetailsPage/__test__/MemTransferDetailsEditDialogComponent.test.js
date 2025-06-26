import React from "react";
import { render, screen } from "@testing-library/react";

import MemTransferDetailsEditDialogComponent from "../MemTransferDetailsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders memTransferDetails edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MemTransferDetailsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("memTransferDetails-edit-dialog-component")).toBeInTheDocument();
});
