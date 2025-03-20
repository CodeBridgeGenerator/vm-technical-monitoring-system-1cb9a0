import React from "react";
import { render, screen } from "@testing-library/react";

import MachineMasterPage from "../MachineMasterPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders machineMaster page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MachineMasterPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("machineMaster-datatable")).toBeInTheDocument();
    expect(screen.getByRole("machineMaster-add-button")).toBeInTheDocument();
});
