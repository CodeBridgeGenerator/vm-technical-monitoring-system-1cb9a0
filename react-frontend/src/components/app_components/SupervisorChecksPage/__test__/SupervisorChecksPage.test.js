import React from "react";
import { render, screen } from "@testing-library/react";

import SupervisorChecksPage from "../SupervisorChecksPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders supervisorChecks page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <SupervisorChecksPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("supervisorChecks-datatable")).toBeInTheDocument();
    expect(screen.getByRole("supervisorChecks-add-button")).toBeInTheDocument();
});
