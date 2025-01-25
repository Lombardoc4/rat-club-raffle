import {
    getCurrentUser,
    SignInInput,
    signIn,
    AuthError,
    confirmSignIn,
    signOut,
    fetchAuthSession,
    resetPassword,
    ResetPasswordOutput,
    confirmResetPassword,
    ConfirmResetPasswordInput,
} from "aws-amplify/auth";

export const currentAuthenticatedUser = async () => {
    try {
        await getCurrentUser();
        return true;
    } catch (err) {
        // console.log('auth error', err);
        return false;
    }
};

export const handleSignIn = async ({ username, password }: SignInInput) => {
    try {
        const { isSignedIn, nextStep } = await signIn({ username, password });
        return { isSignedIn, nextStep };
    } catch (error) {
        return { isSignedIn: false, error: (error as AuthError).message };
    }
};

export const handleConfirmSignIn = async (newPass: string, userAttributes: { username: string; password: string }) => {
    try {
        await signIn({ ...userAttributes });

        const { isSignedIn, nextStep } = await confirmSignIn({
            challengeResponse: newPass,
            options: {
                ...userAttributes,
            },
        });

        return { isSignedIn, nextStep };
    } catch (error) {
        return { isSignedIn: false, error: (error as AuthError).message };
    }
};

export const handleSignOut = async () => {
    try {
        await signOut();
        window.location.reload();
    } catch (error) {
        console.log("error signing out: ", error);
    }
};

export const handleResetPassword = async (username: string) => {
    try {
        const output = await resetPassword({ username });
        return { nextStep: output.nextStep }
    } catch (error) {
        return { error: (error as AuthError).message };
    }
};


export const handleConfirmResetPassword = async ({ username, confirmationCode, newPassword }: ConfirmResetPasswordInput) => {
    try {
        const res = await confirmResetPassword({ username, confirmationCode, newPassword });
        console.log('res', res)
    } catch (error) {
        console.log(error);
        return { error: (error as AuthError).message };

    }
};
