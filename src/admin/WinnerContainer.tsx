import { useEffect, useState } from 'react';
import { RaffleEntry, Winner } from '../API';
import { Button } from '../components/Button';
import { createWinner } from '../graphql/mutations';
import { listWinners } from '../graphql/queries';
import client from '../graphql/client';

export const WinnerContainer = ({
  entries = [],
  pid,
  raffleID,
}: {
  entries?: RaffleEntry[];
  pid: string
  raffleID: string;
}) => {
  const [showEmails, setShowEmails] = useState<boolean>(false);
  const [winners, setWinners] = useState<Winner[]>([]);

  const fetchWinners = async () => {
    // Fetch Winners
    const { data } = await client.graphql({
      query: listWinners,
      variables: {
        filter: {
          raffleID: { eq: raffleID },
        },
      },
    });
    setWinners(data.listWinners.items);
  };

  const generateWinner = async () => {
    const potentialWinners = entries.filter(
      (entry) => !winners.find((winner) => winner.email === entry.email),
    );

    const winner =
      potentialWinners[Math.floor(Math.random() * potentialWinners.length)];

    const { data } = await client.graphql({
      query: createWinner,
      variables: {
        input: {
          ...winner,
          raffle_id: pid,
          raffleID: raffleID
        },
      },
    });

    setWinners([...winners, data.createWinner]);
  };

  useEffect(() => {
    fetchWinners();
  }, []);


  return (
    <div>
      <div className='flex justify-between'>
        <h2 className='text-2xl'>
          Winner{winners.length > 1 ? 's: ' + winners.length : ''}
        </h2>
        {entries.length > 0 && (
          <label className='flex items-center space-x-2'>
            <input
              type='checkbox'
              checked={showEmails}
              onChange={() => setShowEmails(!showEmails)}
            />
            <div className='text-sm font-semibold text-slate-200'>
              Show Emails
            </div>
          </label>
        )}
      </div>
      {entries.length > 0 && (
        <Button title='Generate Winner' onClick={generateWinner} />
      )}
      {winners.length > 0 && (
        <ul className='rounded-sm border p-4 my-4'>
          {winners.map((winner, index) => (
            <li className='text-xl' key={winner.id + index}>
              <p className='capitalize'>{winner.name}</p>
              {showEmails && <p className='text-xs'> {winner.email}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
