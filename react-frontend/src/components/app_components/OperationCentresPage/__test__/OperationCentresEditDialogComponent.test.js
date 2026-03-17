import React from "react";
import { render, screen } from "@testing-library/react";

import OperationCentresEditDialogComponent from "../OperationCentresEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders operationCentres edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <OperationCentresEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("operationCentres-edit-dialog-component")).toBeInTheDocument();
});
