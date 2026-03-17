import React from "react";
import { render, screen } from "@testing-library/react";

import ClosureStatesCreateDialogComponent from "../ClosureStatesCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders closureStates create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ClosureStatesCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("closureStates-create-dialog-component")).toBeInTheDocument();
});
