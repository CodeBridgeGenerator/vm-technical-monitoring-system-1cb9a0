import React from "react";
import { render, screen } from "@testing-library/react";

import PartsMasterRawEditDialogComponent from "../PartsMasterRawEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders partsMasterRaw edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PartsMasterRawEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("partsMasterRaw-edit-dialog-component")).toBeInTheDocument();
});
