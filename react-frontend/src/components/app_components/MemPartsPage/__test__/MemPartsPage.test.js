import React from "react";
import { render, screen } from "@testing-library/react";

import MemPartsPage from "../MemPartsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders memParts page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MemPartsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("memParts-datatable")).toBeInTheDocument();
    expect(screen.getByRole("memParts-add-button")).toBeInTheDocument();
});
