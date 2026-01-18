import React from "react";
import { render, screen } from "@testing-library/react";

import MemMachinesPage from "../MemMachinesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders memMachines page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MemMachinesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("memMachines-datatable")).toBeInTheDocument();
    expect(screen.getByRole("memMachines-add-button")).toBeInTheDocument();
});
