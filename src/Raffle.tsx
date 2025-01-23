import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/api";
import { useParams, Link } from "react-router";
import { Button } from "./components/Button";
import { RaffleHeader } from "./components/RaffleHeader";
import { Raffle as RaffleType } from "./API";
import moment from "moment";
import { getRaffleWithWinners } from "./graphql/custom-queries";
import { RaffleForm } from "./RaffleForm";
import { listRaffles } from "./graphql/queries";
import { W } from "react-router/dist/development/fog-of-war-Ckdfl79L";
import { WinnerContainer } from "./admin/WinnerContainer";

const client = generateClient();

export const DefaultRaffle = () => {
    const [raffle, setRaffle] = useState<RaffleType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    let { pid } = useParams();

    useEffect(() => {
        fetchRaffle();
        () => {
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
            console.log("error fetching winners");
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
    if (raffle && moment(raffle.end_date).isBefore(moment())) {
        return (
            <main>
                <Link to='/admin' className='fixed right-4 bottom-4 flex justify-center items-center'>
                    <Button title='🏠' />
                </Link>

                <RaffleHeader raffle={raffle} />

                {/* Bump to separate component */}
                <div className='max-w-96 w-full mx-auto grid gap-4'>
                    {/* Winners */}
                    <WinnerContainer raffleID={raffle.id} />
                    {
                        <div className="order-2">
                            {raffle.drawing_date ? (
                                <div className='mt-4'>
                                    <p className='font-bold'>
                                        Drawing {moment(raffle.drawing_date).isBefore(moment()) ? "was" : "on"}
                                    </p>
                                    <p className='border border-blue-500 py-1 px-2 rounded text-xl'>
                                        {moment(raffle.drawing_date).format("LLLL")}
                                    </p>
                                </div>
                            ) : (
                                <p className='text-xl'>
                                    Raffle Closed <br /> Stay Tuned
                                </p>
                            )}
                        </div>
                    }
                </div>
            </main>
        );
    }

    return (
        <main>
            <Link to='/admin' className='fixed right-4 bottom-4 flex justify-center items-center'>
                <Button title='🏠' />
            </Link>

            <RaffleHeader raffle={raffle} />

            <div className='max-w-96 mx-auto'>
                {/* Entry form */}

                {raffle && moment(raffle.start_date).isAfter(moment()) ? (
                    <div>
                        <p className='font-bold'>Raffle Starts:</p>
                        <p className='border border-green-500 py-1 px-2 rounded'>
                            <span className='text-xl'>{moment(raffle.start_date).format("LLLL")}</span>
                        </p>
                    </div>
                ) : (
                    <>
                        <RaffleForm raffle={raffle} />

                        {raffle.drawing_date && (
                            <div className='mt-4'>
                                <p className='font-bold'>Raffle Drawing:</p>
                                <p className='border border-blue-500 py-1 px-2 rounded text-xl'>
                                    {moment(raffle.drawing_date).format("LLLL")}
                                </p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </main>
    );
};
