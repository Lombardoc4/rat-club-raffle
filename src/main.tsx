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
import { Dashboard } from "./admin/Dashboard";
import { AdminRaffleForm } from "./admin/RaffleForm";
import moment from "moment";
import { ResetPasswordForm } from "./admin/ResetPasswordForm";

Amplify.configure(awsExports);

moment.tz.setDefault("America/New_York");


const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <BrowserRouter>
        <main className='pb-12 lg:pb-16 container mx-auto grid gap-4'>

            <Routes>
                <Route element={<Logo />}>
                    <Route index element={<Home />} />
                    <Route path='reset-password' element={<ResetPasswordForm />} />
                    <Route path='admin' element={<Admin />}>
                        <Route index element={<Dashboard/>} />
                        <Route path='create' element={<AdminRaffleForm />} />
                        <Route path='edit/:pid' element={<AdminRaffleForm />} />
                        <Route path=':pid' element={<AdminRaffle />} />
                    </Route>
                    <Route path=':pid' element={<DefaultRaffle />} />
                </Route>
            </Routes>
        </main>
        </BrowserRouter>
    </React.StrictMode>
);
