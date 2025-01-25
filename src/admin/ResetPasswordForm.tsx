import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { handleConfirmResetPassword, handleResetPassword } from "./utils";
import { events } from "aws-amplify/api";

export const ResetPasswordForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmationCode, setConfirmatioCode] = useState("");
    const [enterCode, setEnterCode] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleReset = async (event: React.FormEvent) => {
        event.preventDefault();
        const res = await handleConfirmResetPassword({
            username: username,
            confirmationCode: confirmationCode,
            newPassword: password,
        });

        if (res && res.error) {
            setError(error);
            return;
        }

        navigate("/admin");
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const { nextStep, error } = await handleResetPassword(username);
        if (error) {
            setError(error);
            return;
        }

        if (nextStep) {
            switch (nextStep.resetPasswordStep) {
                case "CONFIRM_RESET_PASSWORD_WITH_CODE":
                    setMessage(
                        `Confirmation code was sent by ${nextStep.codeDeliveryDetails.deliveryMedium} to ${nextStep.codeDeliveryDetails.destination}`
                    );
                    setEnterCode(true);
                    break;
                case "DONE":
                    console.log("Successfully reset password.");
                    break;
            }
        }
    };


    if (enterCode) {
        return (
            <div className='flex items-center justify-center min-h-screen'>
                <div className='w-full max-w-md p-8 space-y-6 rounded shadow-md'>
                    <div className='font-bold text-center'>
                        <h2 className='text-2xl'>Reset Password</h2>
                        {!error && message && <p>{message}</p>}
                        {error && <p className='text-red-600'>{error}</p>}
                    </div>
                    <form className='space-y-6' onSubmit={handleReset}>
                        <div>
                            <label className='block text-sm font-medium'>
                                Confirmation Code
                                <input
                                    type='text'
                                    value={confirmationCode}
                                    onChange={(e) => setConfirmatioCode(e.target.value)}
                                    className='bg-black block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                />
                            </label>
                        </div>
                        <div>
                            <label className='block text-sm font-medium'>
                                New Password
                                <input
                                    type='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='bg-black block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                />
                            </label>
                        </div>

                        <button
                            type='submit'
                            className='w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className='flex items-center justify-center min-h-screen'>
            <div className='w-full max-w-md p-8 space-y-6 rounded shadow-md'>
                <div className='font-bold text-center'>
                    <h2 className='text-2xl'>Reset Password</h2>
                    {!error && message && <p>{message}</p>}
                    {error && <p className='text-red-600'>{error}</p>}
                </div>
                <form className='space-y-6' onSubmit={handleSubmit}>
                    <div>
                        <label className='block text-sm font-medium'>
                            Username
                            <input
                                type='text'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className='bg-black block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                            />
                        </label>
                    </div>

                    <button
                        type='submit'
                        className='w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    >
                        Send Code
                    </button>
                </form>

                <div className='text-center'>
                    <Link className='underline text-indigo-600' to='/admin'>
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};
