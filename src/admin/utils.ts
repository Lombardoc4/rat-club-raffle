import { getCurrentUser, SignInInput, signIn, AuthError, confirmSignIn, signOut } from "aws-amplify/auth";

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
    console.log("user", userAttributes);
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
    } catch (error) {
        console.log("error signing out: ", error);
    }
};
