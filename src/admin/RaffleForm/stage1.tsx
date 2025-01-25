import React, { useState } from 'react';
import { listRaffles } from '../../graphql/queries';
import client from '../../graphql/client';
import { CreateRaffleInput, UpdateRaffleInput } from '../../API';

const validateFormName = async (name: string) => {
  const { data } = await client.graphql({
    query: listRaffles,
    variables: { filter: { name: { eq: name } } },
  });

  // Confirm no matches
  return data?.listRaffles?.items?.length === 0;
};

export const Stage1 = ({
  updateForm,
  raffle,
  children,
}: {
  updateForm: (values: { name: string; patreon: boolean }) => void;
  raffle: CreateRaffleInput | UpdateRaffleInput;
  children: React.ReactNode;
}) => {
  const [name, setName] = useState(raffle.name ?? '');
  const [patreon, setPatreon] = useState(raffle.patreon ?? false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Check if name exists

    if (!name) {
      setError('Field required');
      return;
    }

    const validName = await validateFormName(name);

    if (!validName && !raffle.id) {
      setError('A raffle with this name already exists');
      return;
    }

    // Update form values
    updateForm({ name, patreon });
  };

  return (
    <form className='space-y-4 rounded border p-4' onSubmit={handleSubmit}>
      <div>
        <div className='flex justify-between'>
          <label className='block text-sm font-medium'>Name</label>
          {error && <p className='text-red-500'>{error}</p>}
        </div>
        <input
          type='text'
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
          className='mt-1 block w-full rounded-md border border-gray-300 bg-black px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
        />
      </div>
      <div className='flex items-center'>
        <input
          type='checkbox'
          checked={patreon}
          onChange={(e) => setPatreon(e.target.checked)}
          className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
        />
        <label className='ml-2 block text-sm'>Patreon Only</label>
      </div>
      {children}
    </form>
  );
};
