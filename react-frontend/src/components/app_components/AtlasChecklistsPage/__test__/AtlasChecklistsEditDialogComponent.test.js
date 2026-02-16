import React from "react";
import { render, screen } from "@testing-library/react";

import AtlasChecklistsEditDialogComponent from "../AtlasChecklistsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders atlasChecklists edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <AtlasChecklistsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("atlasChecklists-edit-dialog-component")).toBeInTheDocument();
});
