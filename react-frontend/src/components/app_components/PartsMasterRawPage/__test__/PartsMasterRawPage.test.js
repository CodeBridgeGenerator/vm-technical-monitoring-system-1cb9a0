import React from "react";
import { render, screen } from "@testing-library/react";

import PartsMasterRawPage from "../PartsMasterRawPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders partsMasterRaw page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PartsMasterRawPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("partsMasterRaw-datatable")).toBeInTheDocument();
    expect(screen.getByRole("partsMasterRaw-add-button")).toBeInTheDocument();
});
