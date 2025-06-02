import React from "react";
import { render, screen } from "@testing-library/react";

import OperationCentresCreateDialogComponent from "../OperationCentresCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders operationCentres create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <OperationCentresCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("operationCentres-create-dialog-component")).toBeInTheDocument();
});
