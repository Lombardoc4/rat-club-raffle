import React, { useState } from 'react';

interface NewPasswordFormProps {
  onSubmit: (newPassword: string) => void;
  error: string;
}

const NewPasswordForm: React.FC<NewPasswordFormProps> = ({ onSubmit, error }) => {
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(newPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Set New Password</h2>
        {error && <h3 className="text-xl text-red-600 text-center">{error}</h3>}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">
              New Password
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Set New Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPasswordForm;