import React from "react";
import { render, screen } from "@testing-library/react";

import WarantyPeriodDetailsCreateDialogComponent from "../WarantyPeriodDetailsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders warantyPeriodDetails create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <WarantyPeriodDetailsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("warantyPeriodDetails-create-dialog-component")).toBeInTheDocument();
});
