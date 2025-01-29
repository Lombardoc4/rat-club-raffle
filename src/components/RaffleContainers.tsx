import { Link, useNavigate } from 'react-router';
import { Raffle } from '../API';
import { Button } from './Button';
import moment from 'moment-timezone';

export const RaffleCardContainer = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className=''>
      <h2 className='mb-2 text-3xl font-bold'>{title}</h2>
      <div className='grid items-end gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {children}
      </div>
    </div>
  );
};

export const RaffleCard = ({
  raffle,
  active = false,
  detailed = false,
  removeRaffle,
}: {
  raffle: Raffle;
  active?: boolean;
  detailed?: boolean;
  removeRaffle?: (raffle: Raffle) => void;
}) => {
  const navigate = useNavigate();
  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (removeRaffle) {
      removeRaffle(raffle);
    }
  };

  return (
    <div className='group grid gap-4 rounded-lg border border-gray-300 p-4'>
      {/* Image */}
      {raffle.images && raffle.images.length > 0 && (
        <div
          onClick={() => navigate(raffle.pid)}
          className='flex cursor-pointer items-center justify-center rounded-sm border p-2'
        >
          {raffle.images.map((img, i) => (
            <img
              key={raffle.name + i}
              className='max-h-52'
              src={img}
              alt={raffle.name}
            />
          ))}
        </div>
      )}

      {/* Name */}
      <h3
        onClick={() => navigate(raffle.pid)}
        className='cursor-pointer text-4xl font-bold group-hover:underline'
      >
        {raffle.name}
      </h3>

      {/* Raffle Entries & Winners */}
      {detailed && (
        <>
          {/* Timing of Raffle */}
          <div className='grid grid-cols-2 gap-4'>
            <p className='text-xl'>
              <span className='text-4xl font-bold'>
                {raffle.RaffleEntries?.items.length}
              </span>
              <br />
              Entries
            </p>
            <p className='text-xl'>
              <span className='text-4xl font-bold'>
                {raffle.Winners?.items.length}
              </span>
              <br />
              Winners{' '}
            </p>
          </div>
          {/* {active && (
                        <Link to={"/live/" + raffle.pid}>
                            <Button title='Live entries (coming soon)' />
                        </Link>
                    )}  */}
          {!active && (
            <Link to={'/admin/' + raffle.pid}>
              <Button title='Select Winner' />
            </Link>
          )}
        </>
      )}

      {/* ADMIN: Edit or Remove Raffle */}
      {removeRaffle && (
        <div className='grid grid-cols-2 gap-4'>
          <Link
            to={'/admin/edit/' + raffle.pid}
            onClick={(e) => e.stopPropagation}
          >
            <Button title='Edit' />
          </Link>
          <Button title='Remove' onClick={handleRemove} />
        </div>
      )}

      {/* Dates of raffle */}
      {moment(raffle.start_date).isAfter(moment()) && (
        <div>
          <p className='font-bold'>Starts:</p>
          <p className='rounded-sm border border-green-500 px-2 py-1'>
            {moment(raffle.start_date).format('LLLL')} EST
          </p>
        </div>
      )}
      <div className='flex gap-4'>
        <div className='flex-1'>
          <p className='font-bold'>Ends:</p>
          <p className='rounded-sm border border-red-500 px-2 py-1'>
            {moment(raffle.end_date).format('LLLL')} EST
          </p>
        </div>
        {raffle.drawing_date && (
          <div className='flex-1'>
            <p className='font-bold'>Drawing:</p>
            <p className='rounded-sm border border-blue-500 px-2 py-1'>
              {moment(raffle.drawing_date).format('LLLL')} EST
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
