import { Raffle } from "../API";

export const RaffleHeader = ({ raffle }: { raffle: Raffle }) => (
    <div className='m-2 text-center'>
        {raffle.images && raffle.images.length > 0 &&
            raffle.images.map((img, i) => (
                <img key={raffle.name + i} className='max-h-80 mx-auto' src={img} alt={raffle.name} />
            ))}
        <div className='my-2'>
            <h1 className='text-4xl font-bold'>{raffle.name}</h1>
        </div>
    </div>
);