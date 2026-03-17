import React from "react";
import { render, screen } from "@testing-library/react";

import QontakWhatsappRecordsPage from "../QontakWhatsappRecordsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders qontakWhatsappRecords page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <QontakWhatsappRecordsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("qontakWhatsappRecords-datatable")).toBeInTheDocument();
    expect(screen.getByRole("qontakWhatsappRecords-add-button")).toBeInTheDocument();
});
