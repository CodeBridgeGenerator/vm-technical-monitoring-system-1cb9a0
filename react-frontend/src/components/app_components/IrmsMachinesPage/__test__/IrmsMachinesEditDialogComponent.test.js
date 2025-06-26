import React from "react";
import { render, screen } from "@testing-library/react";

import IrmsMachinesEditDialogComponent from "../IrmsMachinesEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders irmsMachines edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <IrmsMachinesEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("irmsMachines-edit-dialog-component")).toBeInTheDocument();
});
