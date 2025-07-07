import React from "react";
import { render, screen } from "@testing-library/react";

import ClosureStatesPage from "../ClosureStatesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders closureStates page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ClosureStatesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("closureStates-datatable")).toBeInTheDocument();
    expect(screen.getByRole("closureStates-add-button")).toBeInTheDocument();
});
