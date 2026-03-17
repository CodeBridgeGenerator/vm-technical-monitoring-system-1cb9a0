import React from "react";
import { render, screen } from "@testing-library/react";

import QontakWhatsappRecordsCreateDialogComponent from "../QontakWhatsappRecordsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders qontakWhatsappRecords create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <QontakWhatsappRecordsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("qontakWhatsappRecords-create-dialog-component")).toBeInTheDocument();
});
