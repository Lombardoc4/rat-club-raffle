import React, { useState } from 'react';

interface NewPasswordFormProps {
  onSubmit: (newPassword: string) => void;
  error: string;
}

const NewPasswordForm: React.FC<NewPasswordFormProps> = ({
  onSubmit,
  error,
}) => {
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(newPassword);
  };

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='w-full max-w-md space-y-6 rounded-sm p-8 shadow-md'>
        <h2 className='text-center text-2xl font-bold'>Set New Password</h2>
        {error && <h3 className='text-center text-xl text-red-600'>{error}</h3>}
        <form className='space-y-6' onSubmit={handleSubmit}>
          <div>
            <label className='block text-sm font-medium'>
              New Password
              <input
                type='password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className='mt-1 block w-full rounded-md border border-gray-300 bg-black px-3 py-2 shadow-xs focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
              />
            </label>
          </div>
          <button
            type='submit'
            className='w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-xs hover:bg-indigo-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          >
            Set New Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPasswordForm;
