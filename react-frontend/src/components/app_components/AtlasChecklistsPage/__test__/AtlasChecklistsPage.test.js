import React from "react";
import { render, screen } from "@testing-library/react";

import AtlasChecklistsPage from "../AtlasChecklistsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders atlasChecklists page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <AtlasChecklistsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("atlasChecklists-datatable")).toBeInTheDocument();
    expect(screen.getByRole("atlasChecklists-add-button")).toBeInTheDocument();
});
