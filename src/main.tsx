import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "./Home";
import { Logo } from "./components/Logo";
import Admin from "./admin";
import { AdminRaffle } from "./admin/Raffle";
import { DefaultRaffle } from "./Raffle";
import { CreateRaffleForm } from "./CreateRaffleForm";


Amplify.configure(awsExports);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route element={<Logo />}>
                    <Route index element={<Home />} />
                    <Route path='admin'>
                        <Route index element={<Admin />} />
                        <Route path='create' element={<CreateRaffleForm />} />
                        <Route path='edit/:pid' element={<CreateRaffleForm />} />
                        <Route path=':pid' element={<AdminRaffle />} />
                    </Route>
                    <Route path=':pid' element={<DefaultRaffle />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
