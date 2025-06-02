import React from "react";
import { render, screen } from "@testing-library/react";

import AtlasChecksPage from "../AtlasChecksPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders atlasChecks page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <AtlasChecksPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("atlasChecks-datatable")).toBeInTheDocument();
    expect(screen.getByRole("atlasChecks-add-button")).toBeInTheDocument();
});
