import moment from 'moment-timezone';
import { useState, useEffect } from 'react';
import { Link } from 'react-router';

import { Raffle, Winner } from '../API';
import {
  RaffleCardContainer,
  RaffleCard,
} from '../components/RaffleContainers';
import { Button } from '../components/Button';
import client from '../graphql/client';
import { listRafflesDetailed } from '../graphql/custom-queries';
import { deleteRaffle } from '../graphql/mutations';
import { handleSignOut } from './utils';

const sortRaffles = (raffles: Raffle[]) => {
  const sorted: {
    [key in 'upcoming' | 'winnerless' | 'active' | 'old']: Raffle[];
  } = {
    upcoming: [],
    winnerless: [],
    active: [],
    old: [],
  };

  const now = moment();
  raffles.map((r) => {
    // Sort by old and active raffles
    if (moment(r.start_date).isAfter(now)) {
      sorted.upcoming.push(r);
    } else if (moment(r.end_date).isBefore(now)) {
      // Check if raffle has no winners
      if ((r.Winners?.items as Winner[]).length <= 0) {
        sorted.winnerless.push(r);
        return;
      }
      sorted.old.push(r);
    } else {
      sorted.active.push(r);
    }
  });

  return sorted;
};

{
  /* Fake navigation */
}
const FakeNav = () => {
  return (
    <div className='fixed right-4 top-4 flex gap-4'>
      <Link to='/admin/create'>
        <Button title='Create' />
      </Link>

      <Button title='Logout' onClick={handleSignOut} />
    </div>
  );
};

export const Dashboard = () => {
  const [upcomingRaffles, setUpcomingRaffles] = useState<Raffle[]>([]);
  const [winnerlessRaffles, setWinnerlessRaffles] = useState<Raffle[]>([]);
  const [activeRaffles, setActiveRaffles] = useState<Raffle[]>([]);
  const [oldRaffles, setOldRaffles] = useState<Raffle[]>([]);

  const confirmRemoveRaffle = (raffle: Raffle) => {
    const confirm = window.confirm(
      `Are you sure you want to remove ${raffle.name}?`,
    );
    if (confirm) {
      removeRaffle(raffle);
    }
  };

  const removeRaffle = async (raffle: Raffle) => {
    try {
      const { data } = await client.graphql({
        query: deleteRaffle,
        variables: { input: { id: raffle.id } },
      });

      if (data) {
        // Only remove from upcoming raffles
        setUpcomingRaffles((prev) => prev.filter((r) => r.pid !== raffle.pid));
      }
    } catch (err) {
      console.log('Error deleting raffle', err);
    }
  };

  // Fetch raffles on load
  useEffect(() => {
    const fetchRafflesData = async () => {
      const { data } = await client.graphql({ query: listRafflesDetailed });
      if (data.listRaffles.items.length > 0) {
        const { upcoming, winnerless, active, old } = sortRaffles(
          data.listRaffles.items as Raffle[],
        );

        // Update state
        setUpcomingRaffles(upcoming);
        setWinnerlessRaffles(winnerless);
        setActiveRaffles(active);
        setOldRaffles(old);
      }
    };

    fetchRafflesData();
  }, []);

  return (
    <>
      <FakeNav />

      {/* Title */}
      <h1 className='mt-8 text-4xl'>Admin Home</h1>

      {/* Upcming Raffles */}
      {upcomingRaffles.length > 0 && (
        <RaffleCardContainer title={'Upcoming'}>
          {upcomingRaffles.map((r) => (
            <RaffleCard
              key={r.name}
              raffle={r}
              removeRaffle={confirmRemoveRaffle}
            />
          ))}
        </RaffleCardContainer>
      )}

      {/* Winnerless Raffles */}
      {winnerlessRaffles.length > 0 && (
        <RaffleCardContainer title={'Waiting for Winner'}>
          {winnerlessRaffles.map((r) => (
            <RaffleCard key={r.name} raffle={r} detailed />
          ))}
        </RaffleCardContainer>
      )}

      {/* Active Raffles */}
      {activeRaffles.length > 0 && (
        <RaffleCardContainer
          title={'Current Raffle' + (activeRaffles.length > 1 ? 's' : '')}
        >
          {activeRaffles.map((r) => (
            <RaffleCard key={r.name} raffle={r} active detailed />
          ))}
        </RaffleCardContainer>
      )}

      {/* Old Raffles */}
      <RaffleCardContainer title='Past Raffles'>
        {oldRaffles.map((r) => (
          <RaffleCard key={r.name} raffle={r} detailed />
        ))}
      </RaffleCardContainer>
    </>
  );
};
