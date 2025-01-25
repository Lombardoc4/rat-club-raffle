import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/api";
import { useParams, Link } from "react-router";
import { Raffle as RaffleType, RaffleEntry, Winner } from "../API";
import { Button } from "../components/Button";
import { listRafflesDetailed } from "../graphql/custom-queries";
import { RaffleHeader } from "../components/RaffleHeader";
import { RaffleEntriesContainer } from "./EntriesContainer";
import { WinnerContainer } from "./WinnerContainer";


const client = generateClient();

export const AdminRaffle = () => {
    // const [winners, setWinners] = useState<Winner[]>([]);
    const [raffle, setRaffle] = useState<RaffleType | null>(null);
    const [entries, setEntries] = useState<RaffleEntry[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { pid } = useParams();

    console.log('pid', pid);

    useEffect(() => {
        fetchWinners();
        () => {
            setEntries([]);
            setRaffle(null);
            setLoading(true);
        };
    }, []);

    // Todo: Move to api file
    async function fetchWinners() {
        try {
            console.log('raffleInfo', pid);
            const { data } = await client.graphql({
                query: listRafflesDetailed,
                variables: {
                    filter: { pid: { eq: pid } },
                },
            });
            console.log('raffleInfo', data, pid);

            const raffleInfo = data.listRaffles.items[0] as RaffleType;
            const raffleEntries = raffleInfo.RaffleEntries?.items as RaffleEntry[];

            // setWinners(winners);
            setRaffle(raffleInfo);
            setEntries(raffleEntries);
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

    return (
        <main className='pb-12 lg:pb-16 container mx-auto'>
            <Link to='/admin' className='fixed right-4 bottom-4 flex justify-center items-center'>
                <Button title='🏠' />
            </Link>

            <RaffleHeader raffle={raffle} />
            <div className='max-w-96 mx-auto'>
                {entries.length <= 0 && <p className="text-center">No Entries</p>}
                {entries.length > 0 && (
                    <div className='grid gap-6 max-w-96 mx-auto'>
                        <WinnerContainer raffleID={raffle.id} entries={entries} />
                        {entries.length > 0 && <RaffleEntriesContainer entries={entries} />}
                    </div>
                )}
            </div>
        </main>
    );
};
