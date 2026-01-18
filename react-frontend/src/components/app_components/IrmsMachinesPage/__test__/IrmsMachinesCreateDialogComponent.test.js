import React from "react";
import { render, screen } from "@testing-library/react";

import IrmsMachinesCreateDialogComponent from "../IrmsMachinesCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders irmsMachines create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <IrmsMachinesCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("irmsMachines-create-dialog-component")).toBeInTheDocument();
});
