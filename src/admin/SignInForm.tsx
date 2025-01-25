import React, { useState } from 'react';
import { Link } from 'react-router';

interface SignInFormProps {
  onSubmit: (username: string, password: string) => void;
  error: string;
}

const SignInForm: React.FC<SignInFormProps> = ({ onSubmit, error }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(username, password);
  };

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='w-full max-w-md space-y-6 rounded p-8 shadow-md'>
        <h2 className='text-center text-2xl font-bold'>
          Please sign in to access this page
        </h2>
        {error && <h3 className='text-center text-xl text-red-600'>{error}</h3>}
        <form className='space-y-6' onSubmit={handleSubmit}>
          <div>
            <label className='block text-sm font-medium'>
              Username
              <input
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='mt-1 block w-full rounded-md border border-gray-300 bg-black px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
              />
            </label>
          </div>
          <div>
            <label className='block text-sm font-medium'>
              Password
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='mt-1 block w-full rounded-md border border-gray-300 bg-black px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
              />
            </label>
          </div>
          <button
            type='submit'
            className='w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          >
            Sign In
          </button>
        </form>

        <div className='text-center'>
          <Link className='text-indigo-600 underline' to='/reset-password'>
            Reset Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
