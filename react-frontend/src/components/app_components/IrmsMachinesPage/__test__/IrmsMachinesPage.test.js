import React from "react";
import { render, screen } from "@testing-library/react";

import IrmsMachinesPage from "../IrmsMachinesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders irmsMachines page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <IrmsMachinesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("irmsMachines-datatable")).toBeInTheDocument();
    expect(screen.getByRole("irmsMachines-add-button")).toBeInTheDocument();
});
