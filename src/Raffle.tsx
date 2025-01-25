import moment from 'moment-timezone';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';

import { RaffleForm } from './RaffleForm';
import { WinnerContainer } from './admin/WinnerContainer';
import { Button } from './components/Button';
import { RaffleHeader } from './components/RaffleHeader';

import { Raffle as RaffleType } from './API';
import client from './graphql/client';
import { listRaffles } from './graphql/queries';

export const DefaultRaffle = () => {
  const [raffle, setRaffle] = useState<RaffleType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { pid } = useParams();

  useEffect(() => {
    fetchRaffle();
    return () => {
      setRaffle(null);
      setLoading(true);
    };
  }, []);

  // Todo: Move to api file
  async function fetchRaffle() {
    try {
      const { data } = await client.graphql({
        query: listRaffles,
        variables: {
          filter: { pid: { eq: pid } },
        },
      });
      setRaffle(data.listRaffles.items[0] as RaffleType);
      setLoading(false);
    } catch (err) {
      console.log('error fetching winners', err);
    }
  }

  if (loading) {
    return <p className='text-4xl'>Loading...</p>;
  }
  if (!raffle) {
    return <p className='text-4xl'>No raffle found</p>;
  }

  // If Raffle exists conditions:
  // 1. Raffle is over
  return (
    <>
      <Link
        to='/'
        className='fixed bottom-4 right-4 flex items-center justify-center'
      >
        <Button title='🏠' />
      </Link>

      <RaffleHeader raffle={raffle} />

      {/* Raffle is over/closed */}
      {moment(raffle.end_date).isBefore(moment()) && (
        <div className='mx-auto grid w-full max-w-96 gap-4'>
          {/* Winners */}
          <WinnerContainer raffleID={raffle.id} />

          {/* Dates */}
          <div className='order-2'>
            {raffle.drawing_date ? (
              <>
                <p className='font-bold'>
                  Drawing{' '}
                  {moment(raffle.drawing_date).isBefore(moment())
                    ? 'was'
                    : 'on'}
                </p>
                <p className='rounded border border-blue-500 px-2 py-1 text-xl'>
                  {moment(raffle.drawing_date).format('LLLL')}
                </p>
              </>
            ) : (
              <p className='text-center text-xl'>
                Raffle Closed <br /> Stay Tuned
              </p>
            )}
          </div>
        </div>
      )}

      {/* Raffle has not started yet */}
      {moment(raffle.start_date).isAfter(moment()) && (
        <div>
          <p className='font-bold'>Raffle Starts:</p>
          <p className='rounded border border-green-500 px-2 py-1'>
            {moment(raffle.start_date).format('LLLL')}
          </p>
        </div>
      )}

      {/* Raffle has started and isn't over */}
      {moment(raffle.start_date).isBefore(moment()) &&
        moment(raffle.end_date).isAfter(moment()) && (
          <>
            <RaffleForm raffle={raffle} />

            {raffle.drawing_date && (
              <div className='mt-4'>
                <p className='font-bold'>Raffle Drawing:</p>
                <p className='rounded border border-blue-500 px-2 py-1 text-xl'>
                  {moment(raffle.drawing_date).format('LLLL')}
                </p>
              </div>
            )}
          </>
        )}
    </>
  );
};
