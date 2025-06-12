import React from "react";
import { render, screen } from "@testing-library/react";

import SampleItemsPage from "../SampleItemsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders sampleItems page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <SampleItemsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("sampleItems-datatable")).toBeInTheDocument();
    expect(screen.getByRole("sampleItems-add-button")).toBeInTheDocument();
});
