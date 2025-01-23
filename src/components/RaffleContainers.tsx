import { Link } from "react-router";
import { Raffle } from "../API";
import { Button } from "./Button";
import moment from "moment";

const formatDate = (date: string) => {
    return new Date(date).toLocaleString();
};

export const RaffleGroupContainer = ({ title, children }: { title: string; children: React.ReactNode }) => {
    return (
        <div className='py-4'>
            <h2 className='font-bold italic'>{title}</h2>
            <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-8 items-end'>{children}</div>
        </div>
    );
};

export const RaffleContainer = ({
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
    return (
        <div>
            <div className='my-2 flex flex-wrap justify-between items-center'>
                <h3 className='text-4xl font-bold'>{raffle.name}</h3>
            </div>
            {/* Raffle PReview */}
            <div className={`flex gap-x-4 items-center my-2`}>
                {/* Images */}
                {raffle.images &&
                    raffle.images.map((img, i) => (
                        <img key={raffle.name + i} className='max-h-52' src={img} alt={raffle.name} />
                    ))}

                <div className='grid gap-4 my-2'>
                    {/* Timing of Raffle */}
                    {detailed && (
                        <>
                            <p className='text-xl'>
                                <span className='font-bold text-4xl'>{raffle.Winners?.items.length}</span>
                                <br />
                                Winners{" "}
                            </p>
                            <p className='text-xl'>
                                <span className='font-bold text-4xl'>{raffle.RaffleEntries?.items.length}</span>
                                <br />
                                Entries
                            </p>
                            {active ? (
                                <Link to={"/live/" + raffle.pid}>
                                    <Button title='Live entries (coming soon)' />
                                </Link>
                            ) : (
                                <Link to={"/admin/" + raffle.pid}>
                                    <Button title='Select Winner' />
                                </Link>
                            )}
                        </>
                    )}
                    {removeRaffle && (
                        <div className='grid grid-cols-2 gap-4'>
                            <Link to={"/admin/edit/" + raffle.pid}>
                                <Button title='Edit Raffle' />
                            </Link>
                            <Button title='Remove Raffle' onClick={() => removeRaffle(raffle)} />
                        </div>
                    )}
                </div>
            </div>

            <div className='my-2 grid gap-y-2'>
                {!detailed && (
                    <div className=''>
                        {active && (
                            <Link to={raffle.pid}>
                                <Button title='Enter Now' />
                            </Link>
                        )}
                        {!active && !moment(raffle.start_date).isAfter(moment()) && (
                            <Link to={raffle.pid}>
                                <Button title='Results' />
                            </Link>
                        )}
                    </div>
                )}
                {moment(raffle.start_date).isAfter(moment()) && (
                    <p className='border border-green-500 py-1 px-2 rounded'>
                        <span className='font-bold'>Starts</span>: {moment(raffle.start_date).format("LLLL")}
                    </p>
                )}
                <div className='flex gap-4'>
                    <div>
                        <p className='font-bold'>Ends:</p>
                        <p className='border border-red-500 py-1 px-2 rounded'>
                            {moment(raffle.end_date).format("LLLL")}
                        </p>
                    </div>
                    {raffle.drawing_date && (
                        <div>
                            <p className='font-bold'>Drawing:</p>
                            <p className='border border-blue-500 py-1 px-2 rounded'>
                                {moment(raffle.drawing_date).format("LLLL")}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
