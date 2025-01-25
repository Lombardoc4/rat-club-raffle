import React, { useState, useEffect } from 'react';
import SignInForm from './SignInForm';
import NewPasswordForm from './NewPasswordForm';
import {
  currentAuthenticatedUser,
  handleConfirmSignIn,
  handleSignIn,
} from './utils';
import { Outlet } from 'react-router';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [requireNewPassword, setRequireNewPassword] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const authenticated = await currentAuthenticatedUser();
      setIsAuthenticated(authenticated);
      setLoading(false);
    };

    checkUser();

    return () => {
      setIsAuthenticated(false);
    };
  }, []);

  const handleSignInSubmit = async (username: string, password: string) => {
    setUsername(username);
    setPassword(password);

    const { isSignedIn, nextStep, error } = await handleSignIn({
      username,
      password,
    });
    if (error) {
      setError(error);
      return;
    }

    if (nextStep?.signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') {
      setRequireNewPassword(true);
    }

    setError('');
    setIsAuthenticated(isSignedIn);
  };

  const handleNewPasswordSubmit = async (newPassword: string) => {
    const { isSignedIn, error } = await handleConfirmSignIn(newPassword, {
      username: username,
      password: password,
    });

    if (error) {
      setError(error);
      return;
    }

    if (isSignedIn) {
      setIsAuthenticated(true);
      setRequireNewPassword(false);
      setError('');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    if (requireNewPassword) {
      return (
        <NewPasswordForm onSubmit={handleNewPasswordSubmit} error={error} />
      );
    }

    return <SignInForm onSubmit={handleSignInSubmit} error={error} />;
  }

  return <Outlet />;
};
export default Admin;
